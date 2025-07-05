import { json, Request, Response } from "express";
import fetch from "node-fetch";
import ReportService from "./Services/reportService";
import UserService from "./Services/userService";

type ChatbotResponse = {
    candidates?: {
        content?: {
            parts?: {
                text?: string;
            }[];
        };
    }[];
};

const categorias: Record<number, string> = {
    1: "Deslizamentos",
    2: "Alagamentos",
    3: "Assalto",
    4: "Incêndio",
    5: "Iluminação",
    6: "Buracos",
    7: "Desabamentos",
};

export default class ChatbotController {
    constructor(private reportService = new ReportService(), private userService = new UserService()) { }

    async pergunta(req: Request, res: Response): Promise<void> {

        const { pergunta } = req.body;

        if (!pergunta) {
            res.status(400).json({ error: "Pergunta nao identificada" });
            return;
        }

        try {
            const reports = await this.reportService.getAllReports();
            const userName = await (await this.userService.getAllUsers()).filter

            if (!reports || reports.length === 0) {
                res.json({ resposta: "Não existe reistros recentes de denuncias" });
                return;
            }
            const lista = reports.map((r: any, i: number) => {
                const data = new Date(r.created_at).toLocaleDateString("pt-br");
                const categoria = categorias[r.category_id] || "Desconhecida";
                return `${i + 1}. (${categoria}) ${r.reportTitle} em ${r.address} em ${data}.`;
            }).join("\n");

            const prompt = `
**Sua Identidade:**
Eu sou um assistente virtual focado em responder perguntas sobre acontecimentos e incidentes gerais da cidade de Pelotas, Rio Grande do Sul.

---
**Instruções Gerais:**
* Se a "Pergunta do Usuário" for sobre **quem é você**, **o que você faz?**, ou similar, responda usando a "Sua Identidade" fornecida acima ou similar de forma espontanêa.
* **Não** fale sobre os problemas se o usuário não perguntar especificamente sobre eles.
* Se a pergunta **não puder ser respondida** utilizando os "Dados Atuais" (e não for sobre sua identidade), informe ao usuário que as informações necessárias não estão nos registros atuais e peça para ele **reformular a pergunta ou fornecer mais detalhes**.
* Mantenha a resposta **concisa e focada** no que foi perguntado.
* Priorize a **precisão** das informações apresentadas.

---

**Pergunta do Usuário:** "${pergunta}"

**Dados Atuais:**
${lista}
`;
            Date.now()

            const respostaGemini = await this.chamarGemini(prompt);
            res.json({ resposta: respostaGemini });

            return;
        } catch (error) {
            console.error("Erro no Chatbot:", error);
            if (error instanceof Error) {
                console.error(error.stack);
            }
            res.status(500).json({ error: "Erro interno no chatbot." });
            return;
        }
    }




    private async chamarGemini(prompt: string): Promise<string> {
        const apiKey = process.env.GEMINI_API_KEY;
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + apiKey,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [{ text: prompt }],
                            role: "user",
                        },
                    ],
                }),
            }
        );

        const data = (await response.json() as ChatbotResponse);
        const resposta = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        return resposta || "Desculpe, não consegui gerar uma resposta.";
    }
}
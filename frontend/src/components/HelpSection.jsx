import { Lightbulb, Droplet, CircleHelp, UserMinus, House, CircleDashed, Tally1 } from 'lucide-react';
import Layout from "./Layout"
import MapImage from "../assets/HelpSectionMap.png"
export default function HelpSection(){
    
    
    return(
        <>
            <Layout>
                <div className="mt-5 max-w-7xl mx-auto">
                    <div className="">
                        <h1 className="font-[montserrat] font-bold text-3xl text-shadow-md">
                            Aprenda a usar o <span className="text-blue-500 italic">Reclamaí</span>
                        </h1>
                    </div>

                    <div className='flex flex-col mt-7 gap-3'>
                        <h2 className='text-2xl font-semibold font-[Montserrat] flex'><CircleDashed className='w-6 mt-1 mr-2'/>Primeiro Passo</h2>
                        <p className='font-[montserrat]'>Após você ter se conectado com a plataforma, irá visualizar um mapa como este: </p>
                        <img src={MapImage} alt="Mapa Home" />
                        <h3 className='text-xl font-semibold'>Como fazer uma denúncia:</h3>
                        <ul className='list-disc ml-8 text-lg'>
                            <li className='font-[montserrat]'>Dê zoom e clique na rua onde aconteceu o ocorrido.</li>
                            <li className='font-[montserrat]'>Após o formulário abrir, preencha as informações.</li>
                            <li className='font-[montserrat]'>Adicione fotos para maior autenticidade na denúncia.</li>
                            <li className='font-[montserrat]'>Envie e aguarde a aprovação! Simples, não!?</li>
                        </ul>
                    </div>
                </div>
            </Layout>
        </>
    )
}
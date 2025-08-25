import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/container";
import { Label } from "./components/label";
import { GameCard } from "@/components/GameCard";
import { Metadata } from "next";

interface PropsParams{
    params: {
        id: string;
    }
}

export async function generateMetadata({ params}: PropsParams): Promise<Metadata>{
    try{
        const response: GameProps = await fetch(`http://sujeitoprogramador.com/next-api/?api=game&id=${params.id}`, {  next: {revalidate: 60}})
        .then((res) => res.json())
        .catch(() => {
        return {
            title: " DalyGames - Descubra jogos incriveis para se divertir"
        }
    })

    return{
        title: response.title,
        description: `${response.description.slice(0, 100)}...`,
        openGraph:{
            title: response.title,
            images: [response.image_url]
        }
    }


      } catch (error) {
        return {
            title: " Daly games - Descubra jogos incriveis para se divertir "
        }
      }
}

async function getData(id: string) {
  try{
    const res = await fetch(`http://sujeitoprogramador.com/next-api/?api=game&id=${id}`, {  next: {revalidate: 60}});
    return res.json();
  } catch (error) {
    throw new Error('Não foi possível buscar o jogo')
  }
}


async function getGameSorted() {

    try{
        const res = await fetch(`http://sujeitoprogramador.com/next-api/?api=game_day`, { cache: "no-store"})
        return res.json();
    }catch(err){
        throw new Error ("Failed to fetch data")
    }
    
}

export default async function Game({
    params: { id }
}: {
    params: {id: string }
}){

    const data: GameProps = await getData(id);
    const SortedGame: GameProps = await getGameSorted();


   if(!data){
    redirect('/')
   }
    return(
        <main className="w-full text-black" >
            <div className="bg-black h-80 sm:h-96 w-full relative">
                <Image 
                    src={data.image_url}
                    alt={data.title}
                    quality={100}
                    priority={true}
                    fill={true}
                    sizes="(max-width: 768px), 100vw, (max-width: 1200px) 44vw"
                    className="w-full h-80 sm:h-96 object-cover opacity-75"
                />
            </div>
            <div>
            <Container>
                    <h1 className="font-bold text-xl my-4 z-20">{data.title}</h1>
                    <p className="text-justify">{data.description}</p>

                    <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
                    <div className="flex gap-2 flex-wrap">
                        {data.platforms.map((item) => (
                            <Label name={item} key={item}/>
                        ))}
                  </div>

                    <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
                    <div className="flex gap-2 flex-wrap">
                        {data.categories.map((item) => (
                            <Label name={item} key={item}/>
                        ))}
                  </div>

                  <p className="mt-7 mb-2"><strong>Data de lançamento: </strong> {data.release}</p>
                    
                  <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado</h2>
                  <div className="flex">
                    <div className="flex-grow">
                        <GameCard data= {SortedGame}/>
                    </div>
                  </div>
                  
            </Container>
            </div>
        </main>
    )
}
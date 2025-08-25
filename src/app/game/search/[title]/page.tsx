import { GameProps } from "@/utils/types/game";
import  {Container}  from "@/components/container";
import { Input } from "@/components/input";
import { GameCard } from "@/components/GameCard";


async function getData(title: string): Promise<GameProps[] | null>{

    try{
        const decodeTitle = decodeURI(title)
        const res = await fetch(`http://sujeitoprogramador.com/next-api/?api=game&title=${decodeTitle}`);
        return res.json();
      } catch (error) {
        return null
    }
}


export default async function Search(
    {
        params: { title }
    } : { 
        params: {title: string }
}){
   
    const games = await getData(title)

    return(
        <div>
            <main className="w-full text-black"> 
                <Container>
                   <Input />
                   <h1 className="font-bold text-xl mt-8 mb-5">veja o que encontramos na nossa base:</h1>
                   {!games && (
                          <p>Nenhum jogo encontrado...</p>
                   )}

                   <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {games && games.map((item) => (
                        <GameCard key={item.id} data={item}/>
                        ))}
                    </section>
                </Container>   
            </main>
        </div>
    )
}
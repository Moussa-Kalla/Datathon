import Image from 'next/image';
import robot from './home-robot.svg'

export default function Home() {
  return (
      <main className="flex items-center justify-center w-full h-screen">
        <div className="flex flex-col items-center justify-center w-3/4 h-full relative overflow-hidden">
            <div className="flex flex-col items-center justify-center p-24">
                <Image className={"w-16 h-16"} src={robot} alt="robot" width={200} height={200} />
              <h1 className={"font-black text-4xl mt-4"}>Bonjour</h1>
                <p className={"mt-2 text-black/70"}>Je suis votre assistant support, je vous aide à trouver les réponses à vos questions.</p>
            </div>
          <div className={"w-3/4 bg-white fixed bottom-0 p-5"}>
            <textarea
                placeholder="Posez votre question ici..."
                className={"resize-none w-full outline-none bg-gray-50 h-24 rounded-3xl border-2 border-gray-200 px-4 py-2"}
                name="message" id="message"></textarea>
          </div>

        </div>
      </main>
  );
}

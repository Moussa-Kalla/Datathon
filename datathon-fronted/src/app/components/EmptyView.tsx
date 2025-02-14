import Image from "next/image";
import logo from "@/app/assets/logo.webp";

// Composant pour afficher le contenu initial lorsque la conversation est vide
export const EmptyContent = () => {
    return (
        <div className="flex flex-col items-center justify-center p-24">
            <div className="w-96 h-48">
                <Image
                    className="object-cover w-full h-full"
                    src={logo}
                    alt="robot"
                    width={200}
                    height={200}
                />
            </div>

            <h1 className="font-black text-4xl mt-20">Bonjour</h1>
            <p className="mt-2 text-black/70">
                Je suis votre assistant support, je vous aide à trouver les réponses à
                vos questions.
            </p>
        </div>
    );
};

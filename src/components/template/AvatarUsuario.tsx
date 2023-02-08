import Link from "../../../node_modules/next/link";
import useAuth from "../../data/hook/useAuth";

interface AvatarUsuarioProps {
	className?: string;
}
export default function AvatarUsuario(props: AvatarUsuarioProps) {
	const { usuario }: any = useAuth();

	return (
		<li>
			<Link href="/perfil">
				<img src={usuario?.imagemURL ?? "../../public/images/avatar_img.jpg"} />
			</Link>
		</li>
	);
	/*

                    className = {`h-10 w-10 rounded-full cursor-pointer
                        ${props.className}
                    `}
    */
}

import {getProviders , signIn} from "next-auth/react";
function LogIn({ providers}) {
    return (
        <div className="bg-black flex flex-col items-center w-full justify-center">
            <h1 className="text-white">Log In</h1>
            <img src="https://www.freepnglogos.com/uploads/spotify-logo-png/spotify-icon-marilyn-scott-0.png" width="200" alt="spotify icon marilyn scott" />
            {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                <button className ="bg-green-500 rounded-full text-white" onClick={() => signIn(provider.id , {callbackUrl : "/"})} >
                    LogIn with {provider.name}
                </button>
                </div>
            ))}
        </div>
    )
}

export default LogIn;

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers,
        },
    };
}
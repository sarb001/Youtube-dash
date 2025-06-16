

export const Home = () => {

    const loginhandler = () => {
        window.location.href = "/api/v1/auth/youtube" ;
    }

    return (
        <div className="flex justify-center items-center cursor-pointer">
            <div className="text-2xl font-semibold"> Mini Yt-dashboard  </div>
            <div className="m-4">
                    <button className="bg-black text-white p-2 px-4 rounded-[6px] " onClick={loginhandler}> Login Now </button>
            </div>
        </div>
    )
}
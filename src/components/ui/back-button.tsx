interface BackButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
}


export default function BackButton({children, onClick}: BackButtonProps) {

    let currentPage = window.history.back();

    return (
        <a onClick={onClick} className="fixed top-5 left-5 z-[999] inline-flex h-12 w-12 p-4 bg-stone-200 dark:bg-stone-900 rounded-full items-center hover:scale-95 transition-all duration-200 text-lg mix-blend-difference">
       
        </a>
    )
}
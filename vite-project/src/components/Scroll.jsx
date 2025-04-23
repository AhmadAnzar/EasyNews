import { useEffect, useState } from 'react';

export default function Scroll() {
    const [atBottom, setAtBottom] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 20;
            setAtBottom(scrolledToBottom);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // check on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scroll = () => {
        window.scrollTo({
            top: atBottom ? 0 : document.body.scrollHeight,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scroll}
            title={atBottom ? 'Scroll to Top' : 'Scroll to Bottom'}
            style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 9999,
               
                color: 'white',
                padding: '12px 16px',
                borderRadius: '50%',
                border: 'none',
                fontSize: 50,
           
                cursor: 'pointer',
            }}
        >
            {atBottom ? '⬆' : '⬇'}
        </button>
    );
}

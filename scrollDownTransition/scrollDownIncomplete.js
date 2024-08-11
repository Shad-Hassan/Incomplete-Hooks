const [downBelow, setDownBelow] = useState(false);


useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScrollTransition = () => {
        if (!windowRef.current) return;

        const rect = windowRef.current.getBoundingClientRect();
        const isAtTop = rect.top <= 0;

        if (window.scrollY > lastScrollY && !downBelow) {
            setDownBelow(true);
        } else if (window.scrollY < lastScrollY && !isAtTop) {
            setDownBelow(false);
        }

        lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScrollTransition);

    return () => {
        window.removeEventListener('scroll', handleScrollTransition);
    };
}, [downBelow]);

useEffect(() => {
    if (downBelow) {
        const targetPosition = windowRef.current.offsetTop - (window.innerHeight * 0.1);
        window.scrollTo({ top: targetPosition, behavior: 'auto' });
    }
}, [downBelow]);
import { useEffect, useState, useRef } from 'react';

export const useInput = (init, validator) => {
    const [value, setValue] = useState(init);
    const onChange = event => {
        const { target: { value } } = event;
        if (
            typeof validator === "function" &&
            validator(value)
        ) setValue(value);
    }

    return { value, onChange };
}

export const useTabs = (index, tabs) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    if (!tabs || !Array.isArray(tabs)) {
        return;
    } else {
        return {
            content: tabs[currentIndex].content,
            onContent: setCurrentIndex
        };
    }
};

export const useTitle = (init) => {
    const [title, setTitle] = useState(init);

    useEffect(() => {
        if (title === "Loading...") console.log('useTitle : Loading...')
        else console.log('useTitle : Complete!')
    }, [title]);

    return { title, setTitle };
}

export const useClick = (onClick) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
    });
    return element;
};

export const useConfirm = (message, resolve, reject) => {
    if (!resolve || typeof callback !== "function") return;
    if (reject && typeof rejection !== "function") return;

    const confirmAction = () => {
        if (window.confirm(message)) resolve();
        else reject();
    }

    return confirmAction;
};

export const usePreventLeave = () => {
    const listner = event => {
        event.preventDefault();
        event.returnValue = '';
    };

    const enablePrevent = () => window.addEventListener('beforeunload', listner);
    const disablePrevent = () => window.removeEventListener('beforeunload', listner);

    return { enablePrevent, disablePrevent };
}

export const useBeforeLeave = (onBefore) => {
    const handle = (event) => {
        const { clientY } = event;
        if (clientY <= 0 && typeof onBefore === "function") onBefore();
    }

    useEffect(() => {
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    })
}

export const useFadeIn = (duration = 2, delay = 0) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
            current.style.opacity = 1;
        }
    });



    return { ref: element, style: { opacity: 0 } };
}

export const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine);

    const handleChange = () => {
        if (typeof onChange === "function") {
            onChange();
        }
        setStatus(navigator.onLine);
    }

    useEffect(() => {
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);

        return () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        }

    })

    return status;
}

export const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });

    const onScroll = () => {
        const x = window.scrollX;
        const y = window.scrollY;
        setState({ x, y });
    }

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll)
    })

    return state;
}
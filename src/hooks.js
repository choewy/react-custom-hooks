import { useEffect, useState, useRef } from 'react';
import defaultAxios from 'axios';

export const useInput = (init, validator) => {
    const [value, setValue] = useState(init);
    const onChange = event => {
        const { target: { value } } = event;
        if (
            typeof validator === "function" &&
            validator(value)
        ) setValue(value);
    };

    return { value, onChange };
};

export const useTabs = (index, tabs) => {
    const [currentIndex, setCurrentIndex] = useState(index);
    if (!tabs || !Array.isArray(tabs)) {
        return;
    } else {
        return {
            content: tabs[currentIndex].content,
            onContent: setCurrentIndex
        };
    };
};

export const useLoading = (init, callback) => {
    const [text, setText] = useState(init);

    useEffect(() => {
        if (typeof callback === "function") {
            callback();
        }
    }, [text, callback]);

    return { text, setText };
}

export const useClick = (onClick) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        };
    });

    return element;
};

export const useConfirm = (message, resolve, reject) => {
    if (!resolve || typeof resolve !== "function") return;
    if (reject && typeof reject !== "function") return;

    const confirmAction = () => {
        if (window.confirm(message)) resolve();
        else reject();
    };

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
};

export const useBeforeLeave = (callback) => {

    const handle = (event) => {
        if (typeof callback === "function" && event.clientY <= 0) callback();
    };

    useEffect(() => {
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    });
};

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
};

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
        };

    });

    return status;
};

export const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });

    const onScroll = () => {
        const x = window.scrollX;
        const y = window.scrollY;
        setState({ x, y });
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });

    return state;
};

export const useFullscreen = (callback) => {
    const element = useRef();

    const onFullscreen = () => {
        if (element.current) {
            element.current.requestFullscreen();
            if (callback && typeof callback === "function") {
                callback(true)
            };
        };
    };

    const exitFullscreen = () => {
        document.exitFullscreen();
        if (callback && typeof callback === "function") {
            callback(false);
        };
    };

    return { element, onFullscreen, exitFullscreen };
};

export const useNotification = (title, options) => {
    if (!("Notification" in window)) { return; };

    const chromeNotification = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission()
                .then(permission => {
                    if (permission === "granted") {
                        new Notification(title, options);
                    } else {
                        return;
                    };
                });
        } else {
            new Notification(title, options);
        };
    };

    return chromeNotification;
};

export const useAxios = (options, axiosInstance = defaultAxios) => {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null
    });

    const [trigger, setTrigger] = useState(0);

    const refetch = () => {
        setState({
            ...state,
            loading: true,
        });
        setTrigger(Date.now());
    };

    useEffect(() => {
        if (!options.url) {
            return;
        };

        axiosInstance(options)
            .then(data => {
                console.log(data);
                setState({
                    ...state,
                    loading: false,
                    data
                })
            })
            .catch(error => {
                setState({
                    ...state,
                    loading: false,
                    error
                })
            })
    }, [trigger]);

    return { ...state, refetch };
}
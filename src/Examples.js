import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { useAxios, useBeforeLeave, useClick, useConfirm, useFadeIn, useFullscreen, useInput, useLoading, useNetwork, useNotification, usePreventLeave, useScroll, useTabs } from "./hooks";

const AppUseInput = () => {

    const inputValidator = (value) => value.length <= 10;
    const inputProps = useInput('', inputValidator);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useInput</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState } from 'react';

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
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <input {...inputProps} />
            <p>10κΈμ μ΄λ΄λ‘ μ ν</p>
        </div>
    );
}

const AppUseTabs = () => {
    const api = [
        {
            tab: "ν­ 1",
            content: "μ²«λ²μ§Έ ν­"
        },
        {
            tab: "ν­ 2",
            content: "λλ²μ§Έ ν­"
        },
        {
            tab: "ν­ 3",
            content: "μΈλ²μ§Έ ν­"
        }
    ];
    const tabs = useTabs(0, api);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useTabs</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState } from 'react';

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
};`}</pre>
            <hr />
            <h2>μμ</h2>
            {api.map((tab, index) =>
                <button key={index} onClick={() => tabs.onContent(index)}>{tab.tab}</button>
            )}
            <p>{tabs.content}</p>
        </div>
    );
};

const AppUseLoading = () => {

    const { text, setText } = useLoading('5μ΄ κ° λκΈ°...');

    setTimeout(() => {
        setText('μ§μ!');
    }, 5000)

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useLoading</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState } from 'react';

export const useLoading = (init, callback) => {
    const [text, setText] = useState(init);

    useEffect(() => {
        if (typeof callback === "function") {
            callback();
        }
    }, [text, callback]);

    return { text, setText };
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <p>{text}</p>
        </div>

    )
};

const AppUseClick = () => {

    const [count, setCount] = useState(0);
    const onClick = () => {
        setCount(count + 1);
    }

    const element = useClick(onClick);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useClick</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useRef } from 'react';

export const useClick = (onClick) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
    });

    return element;
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <button ref={element}>ν΄λ¦­</button>
            <p>ν΄λ¦­ νμ : {count}</p>
        </div>
    )
}

const AppUseConfirm = () => {
    const [answer, setAnswer] = useState("");
    const agree = () => setAnswer("νλͺνμκ΅°μ!")
    const abort = () => setAnswer("λ€μ μκ°ν΄λ³΄μΈμ.");
    const onConfirm = useConfirm("νμ΄ λ§μμ λμλμ?", agree, abort);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useConfirm</h1>
            <h2>μ½λ</h2>
            <pre>{`export const useConfirm = (message, resolve, reject) => {
    if (!resolve || typeof resolve !== "function") return;
    if (reject && typeof reject !== "function") return;

    const confirmAction = () => {
        if (window.confirm(message)) resolve();
        else reject();
    }

    return confirmAction;
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <button onClick={onConfirm}>confirm</button>
            <p>κ²°κ³Ό : {answer}</p>
        </div>
    )
};

const AppUsePreventLeave = () => {
    const { enablePrevent, disablePrevent } = usePreventLeave();

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ usePreventLeave</h1>
            <h2>μ½λ</h2>
            <pre>{`export const usePreventLeave = () => {
    const listner = event => {
        event.preventDefault();
        event.returnValue = '';
    };

    const enablePrevent = () => window.addEventListener('beforeunload', listner);
    const disablePrevent = () => window.removeEventListener('beforeunload', listner);

    return { enablePrevent, disablePrevent };
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <button onClick={enablePrevent}>νμ±ν</button>
            <button onClick={disablePrevent}>λΉνμ±ν</button>
            <p>νμ±νλ₯Ό ν΄λ¦­νκ³  νμ΄μ§λ₯Ό λ«μλ³΄μΈμ.</p>
        </div>
    )
};

const AppUseBeforeLeave = () => {
    const callback = () => alert("λ»₯μ΄μμ!");
    useBeforeLeave(callback);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useBeforeLeave</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useEffect } from 'react';
            
export const useBeforeLeave = (callback) => {
    const handle = (event) => {
        if (typeof callback === "function" && event.clientY <= 0) callback();
    }

    useEffect(() => {
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    })
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <p>PCμμ μ£Όμμ°½μ google.comμ μλ ₯νλ©΄ λΉνΈμ½μΈ 1κ°λ₯Ό μ€λλ€!</p>
        </div>
    )
};

const AppUseFadeIn = () => {

    const element1 = useFadeIn();
    const element2 = useFadeIn(2, 2);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useFadeIn</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useRef, useEffect } from 'react';

export const useFadeIn = (duration = 2, delay = 0) => {
    const element = useRef();

    useEffect(() => {
        if (element.current) {
            const { current } = element;
            current.style.transition = ${'`opacity ${duration}s ease-in-out ${delay}`s'};
            current.style.opacity = 1;
        }
    });

    return { ref: element, style: { opacity: 0 } };
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <p {...element1}>
                λ§μ μ λ³΄μ¬λλ¦΄κ²μ.
            </p>
            <p {...element2}>
                μ¬μ€, κ·Έλ°κ±° ν  μ€ λͺ°λΌμ.
            </p>
        </div>
    )
};

const AppUseNetwork = () => {
    const network = useNetwork(() => {
        if (!network) alert("λ€νΈμν¬ μ°κ²°μ΄ λκ²Όμ΄μ!")
    });

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useNetwork</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState, useEffect } from 'react';

export const useNetwork = onChange => {
    const [status, setStatus] = useState(navigator.onLine);

    const handleChange = () => {
        if (typeof onChange === "function") {
            onChange();
        }
        setStatus(navigator.onLine);
    };

    useEffect(() => {
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);

        return () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        };

    });

    return status;
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <p>λ€νΈμν¬ : {network ? "μ°κ²°λ¨" : "μ°κ²°λκΉ"}</p>
        </div>
    )
};

const AppUseScroll = () => {
    const { y } = useScroll();

    return (
        <div style={{ height: "100vh", padding: "10px" }}>
            <h1>π‘ useScroll</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState, useEffect } from 'react';

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
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <p>νμ¬ YμΆ μ’ν : {y}</p>
        </div>
    )
};

const AppUseFullscreen = () => {
    const [isFull, setIsFull] = useState(false);
    const callback = (value) => setIsFull(value)
    const { element, onFullscreen, exitFullscreen } = useFullscreen(callback);

    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useFullscreen</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useRef } from 'react';
            
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
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <div ref={element} >
                <div>
                    {
                        isFull
                            ? <button onClick={exitFullscreen}>μλλλ‘</button>
                            : <button onClick={onFullscreen}>μ μ²΄νλ©΄</button>
                    }
                </div>
                <div>
                    <img alt="exam" src="https://github.com/choewy/react-custom-hooks/blob/develop/src/images/image.png?raw=true" />
                </div>
            </div>
        </div>
    )
};

const AppUseNotification = () => {
    const triggerNotification = useNotification("μ΄κ²μ!", { body: "μλ¦Όμ΄λΌκ³  μλ¦Ό!" });
    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useNotification</h1>
            <h2>μ½λ</h2>
            <pre>{`export const useNotification = (title, options) => {
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
};`}</pre>
            <hr />
            <h2>μμ</h2>
            <button onClick={triggerNotification}>ν΅μ λ³΄μ~</button>
        </div>
    )
};

const AppUseAxios = () => {
    const { loading, error, data, refetch } = useAxios({ url: "https://yts.am/api/v2/list_movies.json" })
    console.log(loading, error, data)
    return (
        <div style={{ padding: "10px" }}>
            <h1>π‘ useAxios</h1>
            <h2>μ½λ</h2>
            <pre>{`import { useState, useEffect } from 'react';

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
}`}</pre>
            <hr />
            <h2>μμ</h2>
            <div>
                <h3>{data && data.status}</h3>
                <h4>{loading && "λΆλ¬μ€λ μ€..."}</h4>
                <button onClick={refetch}>λ€μ λΆλ¬μ€κΈ°</button>
            </div>
        </div>
    )
}

export const links = [
    { text: "useInput", path: "/useInput" },
    { text: "useTabs", path: "/useTabs" },
    { text: "useLoading", path: "/useLoading" },
    { text: "useClick", path: "/useClick" },
    { text: "useConfirm", path: "/useConfirm" },
    { text: "usePreventLeave", path: "/usePreventLeave" },
    { text: "useBeforeLeave", path: "/useBeforeLeave" },
    { text: "useFadeIn", path: "/useFadeIn" },
    { text: "useNetwork", path: "/useNetwork" },
    { text: "useScroll", path: "/useScroll" },
    { text: "useFullscreen", path: "/useFullscreen" },
    { text: "useNotification", path: "/useNotification" },
    { text: "useAxios", path: "/useAxios" },
];

export const Routes = () => {
    return (
        <Switch>
            <Route exact={true} path="/useInput" component={AppUseInput} />
            <Route exact={true} path="/useTabs" component={AppUseTabs} />
            <Route exact={true} path="/useLoading" component={AppUseLoading} />
            <Route exact={true} path="/useClick" component={AppUseClick} />
            <Route exact={true} path="/useConfirm" component={AppUseConfirm} />
            <Route exact={true} path="/usePreventLeave" component={AppUsePreventLeave} />
            <Route exact={true} path="/useBeforeLeave" component={AppUseBeforeLeave} />
            <Route exact={true} path="/useFadeIn" component={AppUseFadeIn} />
            <Route exact={true} path="/useNetwork" component={AppUseNetwork} />
            <Route exact={true} path="/useScroll" component={AppUseScroll} />
            <Route exact={true} path="/useFullscreen" component={AppUseFullscreen} />
            <Route exact={true} path="/useNotification" component={AppUseNotification} />
            <Route exact={true} path="/useAxios" component={AppUseAxios} />
        </Switch>
    )
};
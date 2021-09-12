import React, { useState } from "react";
import { Route, Switch } from "react-router";
import { useAxios, useBeforeLeave, useClick, useConfirm, useFadeIn, useFullscreen, useInput, useLoading, useNetwork, useNotification, usePreventLeave, useScroll, useTabs } from "./hooks";

const AppUseInput = () => {

    const inputValidator = (value) => value.length <= 10;
    const inputProps = useInput('', inputValidator);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useInput</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <input {...inputProps} />
            <p>10글자 이내로 제한</p>
        </div>
    );
}

const AppUseTabs = () => {
    const api = [
        {
            tab: "탭 1",
            content: "첫번째 탭"
        },
        {
            tab: "탭 2",
            content: "두번째 탭"
        },
        {
            tab: "탭 3",
            content: "세번째 탭"
        }
    ];
    const tabs = useTabs(0, api);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useTabs</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            {api.map((tab, index) =>
                <button key={index} onClick={() => tabs.onContent(index)}>{tab.tab}</button>
            )}
            <p>{tabs.content}</p>
        </div>
    );
};

const AppUseLoading = () => {

    const { text, setText } = useLoading('5초 간 대기...');

    setTimeout(() => {
        setText('짜잔!');
    }, 5000)

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useLoading</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
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
            <h1>💡 useClick</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <button ref={element}>클릭</button>
            <p>클릭 횟수 : {count}</p>
        </div>
    )
}

const AppUseConfirm = () => {
    const [answer, setAnswer] = useState("");
    const agree = () => setAnswer("현명하시군요!")
    const abort = () => setAnswer("다시 생각해보세요.");
    const onConfirm = useConfirm("훅이 마음에 드시나요?", agree, abort);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useConfirm</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <button onClick={onConfirm}>confirm</button>
            <p>결과 : {answer}</p>
        </div>
    )
};

const AppUsePreventLeave = () => {
    const { enablePrevent, disablePrevent } = usePreventLeave();

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 usePreventLeave</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <button onClick={enablePrevent}>활성화</button>
            <button onClick={disablePrevent}>비활성화</button>
            <p>활성화를 클릭하고 페이지를 닫아보세요.</p>
        </div>
    )
};

const AppUseBeforeLeave = () => {
    const callback = () => alert("뻥이에요!");
    useBeforeLeave(callback);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useBeforeLeave</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <p>PC에서 주소창에 google.com을 입력하면 비트코인 1개를 줍니다!</p>
        </div>
    )
};

const AppUseFadeIn = () => {

    const element1 = useFadeIn();
    const element2 = useFadeIn(2, 2);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useFadeIn</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <p {...element1}>
                마술을 보여드릴게요.
            </p>
            <p {...element2}>
                사실, 그런거 할 줄 몰라요.
            </p>
        </div>
    )
};

const AppUseNetwork = () => {
    const network = useNetwork(() => {
        if (!network) alert("네트워크 연결이 끊겼어요!")
    });

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useNetwork</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <p>네트워크 : {network ? "연결됨" : "연결끊김"}</p>
        </div>
    )
};

const AppUseScroll = () => {
    const { y } = useScroll();

    return (
        <div style={{ height: "100vh", padding: "10px" }}>
            <h1>💡 useScroll</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <p>현재 Y축 좌표 : {y}</p>
        </div>
    )
};

const AppUseFullscreen = () => {
    const [isFull, setIsFull] = useState(false);
    const callback = (value) => setIsFull(value)
    const { element, onFullscreen, exitFullscreen } = useFullscreen(callback);

    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useFullscreen</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <div ref={element} >
                <div>
                    {
                        isFull
                            ? <button onClick={exitFullscreen}>원래대로</button>
                            : <button onClick={onFullscreen}>전체화면</button>
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
    const triggerNotification = useNotification("이것은!", { body: "알림이라고 알림!" });
    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useNotification</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <button onClick={triggerNotification}>통신보안~</button>
        </div>
    )
};

const AppUseAxios = () => {
    const { loading, error, data, refetch } = useAxios({ url: "https://yts.am/api/v2/list_movies.json" })
    console.log(loading, error, data)
    return (
        <div style={{ padding: "10px" }}>
            <h1>💡 useAxios</h1>
            <h2>코드</h2>
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
            <h2>예시</h2>
            <div>
                <h3>{data && data.status}</h3>
                <h4>{loading && "불러오는 중..."}</h4>
                <button onClick={refetch}>다시 불러오기</button>
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
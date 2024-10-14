import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Editor.css";
import EmotionItem from "./EmotionItem.jsx";
import Button from "./Button";
import { getFormattedDate, emotionList } from "../util.jsx";

const Editor = ({ initData, onSubmit }) => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        date: getFormattedDate(new Date()),
        emotionId: 3,
        content: '',
    });

    useEffect(() => {
        if (initData) {
            setState({
                ...initData,
                date: getFormattedDate(new Date(parseInt(initData.date))),
            });
        }
    }, [initData]);

    // 날짜 변경했을 때 변경사항을 상태변수에 저장
    const handleOnChange = (e) => {
        setState({
            ...state,
            date: e.target.value,
        });
    };

    // 일기 내용 변경했을 때 변경사항을 상태변수에 저장
    const handleOnChangeContent = (e) => {
        setState({
            ...state,
            content: e.target.value,
        });
    };

    // 기분이 변경했을 때 변경사항을 상태변수에 저장
    const handleOnChangeEmotion = (emotionId) => {
        setState({
            ...state,
            emotionId,
        });
    };
    const handleSubmit = (e) => {
        onSubmit(state);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="Editor">
            <div className="editor_section">
                {/* Date */}
                <h4>오늘의 날짜</h4>
                <div className="input_wrapper">
                    <input type="date" value={state.date} onChange={handleOnChange} />
                </div>
            </div>
            <div className="editor_section">
                {/* Emotion */}
                <h4>오늘의 감정</h4>
                <div className="input_wrapper emotion_list_wrapper">
                    {emotionList.map((it) => (
                        // <img key={it.id} alt={`emotion${it.id}`} src={it.img} />
                        <EmotionItem
                            key={it.id}
                            {...it}
                            onClick={handleOnChangeEmotion}
                            isSelected={state.emotionId === it.id}
                        />
                    ))}
                </div>
            </div>
            <div className="editor_section">
                {/* Diary */}
                <h4>오늘의 일기</h4>
                <div className="input_wrapper">
                    <textarea value={state.content} onChange={handleOnChangeContent} />
                </div>
            </div>
            <div className="editor_section bottom_section">
                {/* Submit */}
                <Button text={'취소하기'} onClick={handleGoBack} />
                <Button text={'작성완료'} type={'positive'} onClick={handleSubmit} />
            </div>
        </div>
    );
};

export default Editor;
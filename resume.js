'use strict';

function Info() {
    return (
        <div>
            <h2>任乾坤</h2>
            <h4>邮箱:bougainvilleas@qq.com</h4>
            <h4>电话:18819284248</h4>
            <h4>学校:广东金融学院</h4>
            <h4>专业:信息管理与信息系统</h4>
            <h4>学历:本科</h4>
            <h4>证书:CET-4计算机二极</h4>
        </div>

    );
}

function MyButton() {
    return (
        <button>
            I'm a button
        </button>
    );
}

export default function Resume() {
    return (
        <div>
            <h1>个人简历</h1>
            <Info />
            <MyButton />
        </div>
    );
}

const rootNode = document.getElementById('resume');
const root = ReactDOM.createRoot(rootNode);
root.render(React.createElement(Resume));
import React from 'react';
import Heading from "../components/UI/Heading/Heading";
import NavBar from "../components/UI/NavBar/NavBar";
import MySelect from "../components/UI/MySelect/MySelect";

const About = () => {
    return (
        <div>
            <NavBar/>
            <Heading>О проекте</Heading>
            <section className="about container">
                <p className="about_text">
                    Данный проект создан по мотивам приключений Рика и Морти. Здесь вы можете поближе познакомиться со
                    всеми персонажами, эпизодами и локациями данного мультсериала.
                    <br/>
                    <br/>
                    Проект является тестовым заданием для входящих кандидатов пула Frontend. В зависимости от грейда
                    кандидата необходимо выполнить соответствующий список заданий. Желаем удачи!
                </p>
            </section>
        </div>

    );
};

export default About;
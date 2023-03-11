import React, { FC } from 'react';
import { formatDate } from '../../utils/helpers/date';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Modal.css';

interface ModalProps {
    active: boolean;
    setActive: (status: boolean) => void;
    date: any;
}

interface SubmitDate {
    [key: string]: string | Date;
    name: string;
    description: string;
    date: any;
    participants: string;
}

// interface CalendarEvent {
//     [key: string]: string | Date; // todo: заменить any на date тип +
//     name: string;
//     description: string;
//     date: any;
//     participants: string;
// }

export const Modal: FC<ModalProps> = ({ active, setActive, date }) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<SubmitDate>();
    const onSubmit: SubmitHandler<SubmitDate> = (submitDate) => {
        const prevEvents = JSON.parse(localStorage.getItem('events') || '[]');
        localStorage.setItem('events', JSON.stringify([...prevEvents, submitDate]));
        console.log(errors);
        reset();
    };

    // const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();

    //     const targets = e.currentTarget.querySelectorAll('input[type="text"]') as NodeListOf<HTMLInputElement>;

    //     const newEvent = Array.from<HTMLInputElement>(targets).reduce((obj: CalendarEvent, element) => {
    //         obj[element.name] = element.value;
    //         return obj;
    //     }, {} as CalendarEvent);

    //     const prevEvents = JSON.parse(localStorage.getItem('events') || '[]');
    //     localStorage.setItem('events', JSON.stringify([...prevEvents, newEvent]));
    // };

    return (
        <>
            <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
                <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <div className="modal-title">
                            <button onClick={() => setActive(false)} className="button">
                                Close
                            </button>
                        </div>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)} className="inputs">
                            <div className="important-inputs">
                                <input {...register('name', { required: true })} className="modal-input" placeholder="Название события" type="text" />
                                <input
                                    readOnly
                                    value={formatDate(date.date, 'DDD DD MMM YYYY')}
                                    {...register('date', { required: true })}
                                    className="modal-input"
                                    placeholder="Дата события"
                                    type="text"
                                />
                                <input {...register('participants', { required: true })} className="modal-input" placeholder="Участники" type="text" />
                            </div>
                            <div className="descripthion-input">
                                <input {...register('descripthion')} className="modal-input" placeholder="Описание" type="text" />
                            </div>
                            <input type="submit"></input>
                        </form>
                    </div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </>
    );
};

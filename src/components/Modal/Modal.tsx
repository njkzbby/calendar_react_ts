import React, { FC } from 'react';
import { formatDate } from '../../utils/helpers/date';
import { SubmitHandler, useForm } from 'react-hook-form';
import './Modal.css';
import { createPortal } from 'react-dom';

interface ModalProps {
    active: boolean;
    setActive: (status: boolean) => void;
    date: any;
}

export interface SubmitDate {
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
        // formState: { errors },
        handleSubmit,
        reset
    } = useForm<SubmitDate>();
    const onSubmit: SubmitHandler<SubmitDate> = (submitDate) => {
        const prevEvents = JSON.parse(localStorage.getItem('events') || '[]');
        localStorage.setItem('events', JSON.stringify([...prevEvents, {
            ...submitDate,
            date: new Date(date.date).getTime()
        }]));
        setActive(false)
        // console.log(errors);
        reset();
    };

    if (active) {
        return (
            <>
                <div className={'modal active'} onClick={() => setActive(false)}>
                    <div className='modal__content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <div className='modal-title'>
                                <button onClick={() => setActive(false)} className='button'>
                                    Close
                                </button>
                            </div>
                        </div>
                        <div className='modal-body'>
                            <form onSubmit={handleSubmit(onSubmit)} className='inputs'>
                                <div className='important-inputs'>
                                    <input {...register('name', { required: true })} className='modal-input'
                                           placeholder='Название события' type='text' />
                                    <input
                                        readOnly
                                        value={formatDate(date.date, 'DDD DD MMM YYYY')}
                                        {...register('date', { required: true })}
                                        className='modal-input'
                                        type='text'
                                    />
                                    <input {...register('participants', { required: true })} className='modal-input'
                                           placeholder='Участники' type='text' />
                                </div>
                                <div className='descripthion-input'>
                                    <input {...register('description')} className='modal-input' placeholder='Описание'
                                           type='text' />
                                </div>
                                <input type='submit'></input>
                            </form>
                        </div>
                        <div className='modal-footer'></div>
                    </div>
                </div>
            </>
        );
    } else {
        return null;
    }
};

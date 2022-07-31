import style from './Field.module.css';

const FieldActivity = ({ field, id, text, textWrong, children }) => {

    return (
        <div className={field.error ? `${style.containerInput} ${style.errorContainer}` : style.containerInput}>
            <label className={style.label} htmlFor={id}>{text}</label>
            {children}
            {field.error && <label htmlFor={id} className={style.lblWrong}>{textWrong}</label>}
        </div>
    )
}

export default FieldActivity;
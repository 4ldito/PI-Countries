import style from './Loading.module.css';

const Loading = () => {
    return (
        <div className={style.background}>
            <div className={style.containerLoading}>
                <div className={`${style.globeLoader} fas fa-globe-americas`}>
                    <i className="fas fa-plane"></i>
                    <p>LOADING..</p>
                </div>
            </div>
        </div>
    )
}

export default Loading
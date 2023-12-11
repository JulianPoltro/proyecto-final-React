import Swal from "sweetalert2";

const Loading = () => {
    const cargando = () => {
        let timerInterval;
        Swal.fire({
        html: "Cargando datos...",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        },
        })
    };

    return (
        <>
        <section>
            {cargando()}
        </section>
        </>
    );
    };

export default Loading;

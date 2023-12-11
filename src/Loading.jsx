import Swal from "sweetalert2";

const Loading = () => {
    const cargando = () => {
        let timerInterval;
        Swal.fire({
        html: "Cargando datos...",
        timer: 2000,
        timerProgressBar: true,
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

import React from 'react'
import loti_dashboard from '../assets/loti_file_3.json'
import Lottie from 'react-lottie';

const LottieFile = () => {

    // Lottie animation options
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loti_dashboard,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <>
            <div className="absolute inset-0 z-0" style={{ opacity: 0.6 }}>
                <Lottie options={defaultOptions} height="100vh" width="100vw" style={{ overflow: "hidden" }} />
            </div>
        </>
    )
}

export default LottieFile
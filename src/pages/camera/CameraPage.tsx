import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType } from '../../Camera';
import styled from 'styled-components';
import ControlPanel from '../../components/ControlPannel/ControlPanel';
import { getClassificationData } from '../../clients/classification.client';
import React from 'react';

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const FullScreenImagePreview = styled.div<{ image: string | null }>`
    width: 100%;
    height: 100%;
    z-index: 100;
    position: absolute;
    background-color: black;
    ${({ image }) => (image ? `background-image:  url(${image});` : '')}
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
`;

async function decodeAndSendBase64Image(base64Str: string) {
    // Strip the header (e.g., "data:image/jpeg;base64,")
    const base64Header = 'data:image/jpeg;base64,';
    if (base64Str.startsWith(base64Header)) {
        base64Str = base64Str.replace(base64Header, '');
    }

    // Decode the base64 string to binary data
    const byteCharacters = atob(base64Str);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    // Create a File object from the blob
    const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });

    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);
    return formData;
}
const CameraPage = () => {
    const [numberOfCameras, setNumberOfCameras] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [showImage, setShowImage] = useState<boolean>(false);
    const camera = useRef<CameraType>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [activeDeviceId, setActiveDeviceId] = useState<string | undefined>(undefined);
    const [torchToggled, setTorchToggled] = useState<boolean>(false);

    const handelPictureTaken = async (image: string) => {
        setImage(image);
        const formData = await decodeAndSendBase64Image(image);
        const response = await getClassificationData(formData);
        console.log(response);
    };

    useEffect(() => {
        (async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((i) => i.kind == 'videoinput');
            setDevices(videoDevices);
        })();
    });

    return (
        <Wrapper>
            {showImage ? (
                <>
                    <FullScreenImagePreview
                        image={image}
                        onClick={() => {
                            setShowImage(!showImage);
                        }}
                    />
                </>
            ) : (
                <Camera
                    ref={camera}
                    aspectRatio="cover"
                    facingMode="environment"
                    numberOfCamerasCallback={(i) => setNumberOfCameras(i)}
                    videoSourceDeviceId={activeDeviceId}
                    errorMessages={{
                        noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                        permissionDenied: 'Permission denied. Please refresh and give camera permission.',
                        switchCamera: 'It is not possible to switch camera to different one because there is only one video device accessible.',
                        canvas: 'Canvas is not supported.',
                    }}
                    videoReadyCallback={() => {
                        console.log('Video feed ready.');
                    }}
                />
            )}
            <ControlPanel
                camera={camera}
                image={image}
                numberOfCameras={numberOfCameras}
                devices={devices}
                setActiveDeviceId={setActiveDeviceId}
                handelPictureTaken={handelPictureTaken}
                setShowImage={setShowImage}
                showImage={showImage}
                setTorchToggled={setTorchToggled}
                torchToggled={torchToggled}
            />
        </Wrapper>
    );
};

export default CameraPage;

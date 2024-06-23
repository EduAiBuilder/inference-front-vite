import { ChangeFacingCameraButton, Control, ImagePreview, TakePhotoButton, TorchButton } from './ControlPanel.style';
import { ControlPanelPropsInterface } from './ControlPanelProps.interface';
import * as React from 'react';

const ControlPanel = ({
    setActiveDeviceId,
    image,
    numberOfCameras,
    devices,
    setShowImage,
    showImage,
    handelPictureTaken,
    camera,
    torchToggled,
    setTorchToggled,
}: ControlPanelPropsInterface) => {
    return (
        <Control>
            <select
                onChange={(event) => {
                    setActiveDeviceId(event.target.value);
                }}
            >
                {devices.map((d) => (
                    <option key={d.deviceId} value={d.deviceId}>
                        {d.label}
                    </option>
                ))}
            </select>
            <ImagePreview
                image={image}
                onClick={() => {
                    setShowImage(!showImage);
                }}
            />
            <TakePhotoButton
                onClick={() => {
                    if (camera.current) {
                        const photo = camera.current.takePhoto();
                        console.log(photo);
                        handelPictureTaken(photo as string);
                    }
                }}
            />
            {camera.current?.torchSupported && (
                <TorchButton
                    className={torchToggled ? 'toggled' : ''}
                    onClick={() => {
                        if (camera.current) {
                            setTorchToggled(camera.current.toggleTorch());
                        }
                    }}
                />
            )}
            <ChangeFacingCameraButton
                disabled={numberOfCameras <= 1}
                onClick={() => {
                    if (camera.current) {
                        const result = camera.current.switchCamera();
                        console.log(result);
                    }
                }}
            />
        </Control>
    );
};

export default ControlPanel;

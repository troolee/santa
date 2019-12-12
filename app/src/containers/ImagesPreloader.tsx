import React from 'react';

interface IProps {
  images: string[];
  onLoad?: () => void;
}

const ImagesPreloader: React.SFC<IProps> = ({images, onLoad}) => {
  const [counter, setCounter] = React.useState(images.length);
  const onImageLoad = () => setCounter(counter - 1);
  React.useEffect(() => {
    if (onLoad && counter === 0) {
      onLoad();
    }
  }, [counter]);

  return (
    <div style={{position: "absolute", left: -100, top: 100, width: 1, height: 1, overflow: "hidden", visibility: "hidden"}}>
      {images.map((imageSrc, index) => <img key={index} src={imageSrc} onLoad={onImageLoad} />)}
    </div>
  );
};

export default ImagesPreloader;

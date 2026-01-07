import React, { useState, useRef } from 'react';
import { X } from 'lucide-react';
import {
  PhotosContainer,
  TitleSection,
  Title,
  Subtitle,
  DropZone,
  CameraImage,
  AddButton,
  HiddenInput,
  PhotoGrid,
  PhotoItem,
  PhotoPreview,
  RemoveButton,
} from './Photos.styles';

const Photos = () => {
  const [photos, setPhotos] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          newPhotos.push(event.target.result as string);
          if (newPhotos.length === files.length) {
            setPhotos((prev) => [...prev, ...newPhotos]);
          }
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <PhotosContainer>
      <TitleSection>
        <Title>숙소 사진 추가하기</Title>
        <Subtitle>
          숙소 등록을 시작하려면 사진 5장을 제출하셔야 합니다. 나중에 추가하거나 변경하실 수 있습니다.
        </Subtitle>
      </TitleSection>

      {photos.length === 0 ? (
        <DropZone onClick={handleAddClick}>
          <CameraImage 
            src="https://a0.muscache.com/im/pictures/mediaverse/mys-camera-light/original/f5418259-0bbc-42ea-8bc3-4c6fa4792c03.png" 
            alt="Camera" 
          />
          <AddButton type="button">사진 추가하기</AddButton>
        </DropZone>
      ) : (
        <>
          <PhotoGrid>
            {photos.map((photo, index) => (
              <PhotoItem key={index}>
                <PhotoPreview src={photo} alt={`Photo ${index + 1}`} />
                <RemoveButton onClick={() => handleRemovePhoto(index)}>
                  <X size={16} />
                </RemoveButton>
              </PhotoItem>
            ))}
          </PhotoGrid>
          <AddButton type="button" onClick={handleAddClick}>
            사진 더 추가하기
          </AddButton>
        </>
      )}

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
    </PhotosContainer>
  );
};

export default Photos;


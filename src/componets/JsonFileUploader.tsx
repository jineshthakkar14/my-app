import React, { useState } from 'react';
import { getActiveModel, getDiagramEngine } from '../utils/DiagramUtil';
import { useNavigate } from 'react-router-dom';
import { AdvancedLinkFactory } from '../pages/Animation';
import { CustomType } from './model/CustomType';
import { CustomPortFactory } from './model/CustomPortFactory';
import { CustomPortModel } from './model/CustomPortModel';
import * as SRD from "@projectstorm/react-diagrams";
import { CustomNodeFactory } from './model/CustomNodeFactory';

const JsonFileUploader: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const navigate = useNavigate()

  const handleUpload = () => {
    if (selectedFile) {

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const jsonContent = event.target.result as string;

        const customTypes: CustomType[] = [
            "building",
            "solarPanel",
            "battery",
            "grid",
          ];
      
          customTypes.map((type) => {
            getDiagramEngine()
              .getPortFactories()
              .registerFactory(
                new CustomPortFactory(
                  type,
                  (config) => new CustomPortModel(SRD.PortModelAlignment.BOTTOM, type)
                )
              );
              getDiagramEngine()
              .getNodeFactories()
              .registerFactory(new CustomNodeFactory(type));
              getDiagramEngine().getLinkFactories().registerFactory(new AdvancedLinkFactory());
          });
        
          getActiveModel().deserializeModel(JSON.parse(jsonContent),getDiagramEngine())
          
          navigate("/diagram")


        }
      };

      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <input type="file" onChange={handleFileChange} className='mx-auto' />
      <button onClick={handleUpload} className='button-24'>Upload JSON</button>
    </div>
  );
};

export default JsonFileUploader;

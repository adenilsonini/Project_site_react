import React, { Component } from "react";
import UploadService from "../../services/upload_img";

export default class UploadImages extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      selectedFiles: [],
      previewImages: [],
      progressInfos: [],
      message: [],
      imageInfos: [],
    };
    this.selectFiles_arq = this.selectFiles_arq.bind(this)
    this.uploadImages = this.uploadImages.bind(this)
  }
  
  selectFiles_arq(event) {
    
  //  let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
     // this.images.concat(URL.createObjectURL(event.target.files[i]))
    //  this.images_files.push(event.target.files[i])
      this.setState(prevState => ({ selectedFiles: prevState.selectedFiles.concat(event.target.files[i]) }))
      this.setState(prevState => ({ previewImages: prevState.previewImages.concat(URL.createObjectURL(event.target.files[i])) }))

    }

  }

    uploadImages() {
      const selectedFiles = this.state.selectedFiles;
  
      let _progressInfos = [];
  
      for (let i = 0; i < selectedFiles.length; i++) {
        _progressInfos.push({ percentage: 0, fileName: selectedFiles[i].name });
      }
  
      this.setState(
        {
          progressInfos: _progressInfos,
          message: [],
        },
        () => {
          for (let i = 0; i < selectedFiles.length; i++) {
            this.upload(i, selectedFiles[i]);
          }
        }
      );
    }


    upload(idx, file) {
      let _progressInfos = [...this.state.progressInfos];
  
      UploadService.upload(file, (event) => {
        _progressInfos[idx].percentage = Math.round((100 * event.loaded) / event.total);
        this.setState({
          progressInfos: _progressInfos,
        });
      })
        .then(() => {
          this.setState((prev) => {
            let nextMessage = [...prev.message, "Imagem enviada com sucesso: " + file.name];
            return {
              message: nextMessage
            };
          });
  
        //   return UploadService.getFiles();
        // })
        // .then((files) => {
        //   this.setState({
        //     imageInfos: files.data,
        //   });
        // })
        // .catch(() => {
        //   _progressInfos[idx].percentage = 0;
        //   this.setState((prev) => {
        //     let nextMessage = [...prev.message, "Could not upload the image: " + file.name];
        //     return {
        //       progressInfos: _progressInfos,
        //       message: nextMessage
        //     };
        //   });
        });
    }
  

    componentDidMount() {
      // UploadService.getFiles().then((response) => {
      //   this.setState({
      //     imageInfos: response.data,
      //   });
      // });
    }



  render() {
    const { selectedFiles, previewImages, progressInfos, message, imageInfos } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">

            {previewImages && (
              <div>
                {previewImages.map((img, i) => {
                  return <img className="preview" style={{marginLeft: '5px', marginBottom: '5px', height: '150px', marginTop: '5px'}} src={img} alt={"image-" + i} key={i} />;
                })}
              </div>
            )}

          </div>
        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="form-Group">
              <label className="btn btn-default p-0">
                <input type="file" multiple accept="image/*" onChange={this.selectFiles_arq} />
              </label>
            </div>
            <div className="form-Group">
              <button style={{width: '140px'}}
                className="btn btn-success btn-sm"
                disabled={!selectedFiles}
                onClick={this.uploadImages}
              >
                Upload
            </button>
            </div>

          </div>
        </div>

        {progressInfos &&
          progressInfos.map((progressInfo, index) => (
            <div className="mb-2" key={index}>
              <span>{progressInfo.fileName}</span>
              <div className="progress">
                <div
                  className="progress-bar progress-bar-info"
                  role="progressbar"
                  aria-valuenow={progressInfo.percentage}
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: progressInfo.percentage + "%" }}
                >
                  {progressInfo.percentage}%
                </div>
              </div>
            </div>
          ))}

        {message.length > 0 && (
          <div className="alert alert-secondary" role="alert">
            <ul>
              {message.map((item, i) => {
                return <li key={i}>{item}</li>;
              })}
            </ul>
          </div>
        )}

        <div className="card mt-3">
          <div className="card-header">List of Files</div>
          <ul className="list-group list-group-flush">
            {imageInfos &&
              imageInfos.map((img, index) => (
                <li className="list-group-item" key={index}>
                  <p><a href={img.url}>{img.name}</a></p>
                  <img src={img.url} alt={img.name} height="80px" />
                </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}
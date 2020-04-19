import { Icon, message, Upload } from 'antd'
import React from 'react'
import * as c from 'classnames'
import { FirebaseClientService } from '@canner/image-service-config'
import firebase from 'firebase'

const getServiceConfig = (filename) => new FirebaseClientService({
  firebase: firebase,
  dir: 'photos', // specify the path you want upload to
  filename, // rename file without extension
  hash: false, // if true, the filename will add a hash string, e.g.: `filename-${hash}.jpg`
}).getServiceConfig()

const allowedTypes = ['image/jpeg', 'image/png', 'image/bmb', 'image/webp']

function beforeUpload(file) {
  if (allowedTypes.indexOf(file.type) === -1) {
    message.error('Unsupported image format!')
  } else if (file.size / 1024 / 1024 > 2) {
    message.error('Image must smaller than 2MB!')
  } else {
    return true
  }

  return false
}

class Avatar extends React.Component {
  state = {
    loading: false,
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      this.setState({
        loading: false,
      }, () => this.props.onSuccess(info.file.response.data.link))
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload photo</div>
      </div>
    )
    const imageUrl = this.props.imageUrl
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className={c({
          'avatar-uploader': true,
          [`avatar-uploader--${this.props.size}`]: !!this.props.size,
        })}
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        {...getServiceConfig(this.props.filename)}
      >
        {(!this.state.loading && imageUrl) ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}

export default Avatar

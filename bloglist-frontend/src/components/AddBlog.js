import React from 'react'
import styled from 'styled-components'

const AddBlog = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {

  const titleWithColor = {
    color: 'blueViolet',
  }

  return (
    <Divider>
      <h2 style={titleWithColor}>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <Inputs name="title" id="title"
            value={title}
            onChange={handleTitleChange}
          />
          Author:
          <Inputs name="author" id="author"
            value={author}
            onChange={handleAuthorChange}
          />
          Url:
          <Inputs name="url" id="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button style={{ backgroundColor: 'green' }} type="submit" id="create">Create</button>
      </form>
    </Divider>
  )
}

const Divider = styled.div`
  padding: 10px;
`

const Inputs = styled.input`
  display: block;
  font-size: 11px;
  padding: 4px 2px;
  border: solid 1px #aacfe4;
  width: 20%;
  margin: 2px 0 20px 10px;
`

export default AddBlog
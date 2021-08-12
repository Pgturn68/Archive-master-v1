import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

// Material UI Components
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormControl, FormControlLabel, FormLabel } from '@material-ui/core';
import { DropzoneAreaBase } from 'material-ui-dropzone'
import { DropzoneArea } from 'material-ui-dropzone';
import { postTrips } from '../utils/api'

import { makeStyles } from '@material-ui/core' // Function Importing CSS from Core Library

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 15,
    display: 'block'
  }
})

export default function Create() {
  const classes = useStyles()
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('Family') // Default Sets Radio
  const [files, setFiles] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)


    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('details', details)
    formData.append('userId', localStorage.getItem('userId'))
    // formData.append('files', files)
    // files.forEach((file) => {
    //   formData.append("files", file)
    // });

    for(const imgFile of files) {
      formData.append("files", imgFile)
    }

    console.log('================formData====================');
    console.log(formData);
    for (let [name, value] of formData) {
      console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }
    console.log('================formData====================');

    postTrips(formData)
      .then((result) => {
        console.log("result: ", result.data);
        setTitle('')
        setDetails('')
        setCategory('Family')
        setFiles([])
       })
      .catch((err) => {
        console.log(err)
       })
  }

  const handleFileChange = (files) => {
    console.log('====================================');
    console.log(files);
    console.log('====================================');
    // this.setState({
    //   files: files
    // });
    setFiles(files)
  }

  return (
    <div>
      <Container>
        <Typography
          variant='h5'
          color='textSecondary'
          component='h2'
          gutterBottom
        >
          New Trip Card
        </Typography>

        <form noValidate autoComplete='off' onSubmit={handleSubmit} encType='multipart/form-data'>
          {/*Form Title*/}
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label='Title'
            value={title}
            variant='outlined'
            color='secondary'
            fullWidth
            required
            error={titleError}
          />
          {/*Form Details*/}
          <TextField
            onChange={(e) => setDetails(e.target.value)}
            className={classes.field}
            label='Write in your journal'
            value={details}
            variant='outlined'
            color='secondary'
            multiline
            rows={4}
            fullWidth
            required
            error={detailsError}
          />
          {/*Form Categories*/}
          <FormControl className={classes.field}>
            <FormLabel>
              Trip Category
            </FormLabel>
            <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
              <FormControlLabel value="Family" control={<Radio />} label="Family Trip" />
              <FormControlLabel value="Business" control={<Radio />} label="Business Trip" />
              <FormControlLabel value="Vacation" control={<Radio />} label="Vacation Trip" />
            </RadioGroup>
          </FormControl>
          {/*Form Button*/}
          {/* <DropzoneAreaBase
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an image here or click"}
            onChange={(files) => console.log('Files:', files)}
            onAlert={(message, variant) => console.log(`${variant}: ${message}`)}
          /> */}
          <DropzoneArea
            acceptedFiles={['image/*']}
            onChange={handleFileChange}
            showFileNames
            dropzoneText="Drag and drop a file here or click"
            showAlerts={false}
            filesLimit={20}
            name="files"
          />
          <Button
            type='submit'
            color='secondary'
            variant='outlined'
            startIcon={<LocationSearchingIcon />}
          >
            Submit
          </Button>
        </form>
      </Container>
    </div>
  )
}
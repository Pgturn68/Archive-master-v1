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
  const [category, setCategory] = useState('family') // Default Sets Radio
  const [files, setFiles] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    console.log('====================================');
    console.log("in the submit area");
    console.log(files)
    console.log('====================================');

    const formData = new FormData()
    formData.append('category', category)
    formData.append('title', title)
    formData.append('details', details)
    files.forEach((file) => {
      formData.append(file.name, file)
    });

    console.log('================formData====================');
    console.log(formData);
    for (let [name, value] of formData) {
      console.log(`${name} = ${value}`); // key1 = value1, then key2 = value2
    }
    console.log('================formData====================');
    // if (title == '') {
    //   setTitleError(true)
    // }
    // if (details == '') {
    //   setDetailsError(true)
    // }
    // if (title && details) {
    //   fetch('http://localhost:8000/notes', {
    //     method: 'POST',
    //     headers: {'Content-type': 'application/json'},
    //     body: JSON.stringify({ title, details, category })
    //   }).then(() => history.push('/'))
    // }
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

        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
          {/*Form Title*/}
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            className={classes.field}
            label='Title'
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
              <FormControlLabel value="family" control={<Radio />} label="Family Trip" />
              <FormControlLabel value="business" control={<Radio />} label="Business Trip" />
              <FormControlLabel value="vacation" control={<Radio />} label="Vacation Trip" />
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
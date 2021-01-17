import React, { useEffect } from 'react';
import { Field } from 'redux-form'
import { MuiThemeProvider, Box } from "@material-ui/core/";
import { DropzoneAreaBase } from 'material-ui-dropzone';
import { createFileFromUrl, readFile } from './helpers';
import theme from './theme';

const renderDropZone = (props) => {
    const {
        input,
        meta,
        acceptedFiles = ['image/*'],
        dropzoneText = "Drag and drop an image or click",
        ...custom
    } = props;

    const [files, setFiles] = React.useState([]);
    const [dragIndex, setDragIndex] = React.useState(null);

    useEffect(() => {
        let isMounted = true;

        if (input.value.length) {
            Promise.all(
                input.value.map(async ({ id, src, file }) => {
                    file = src ? await createFileFromUrl(src) : file;
                    const data = await readFile(file);
                    return { id, file, data, };
                })
            ).then((result) => isMounted && setFiles(result));
        }

        return () => isMounted = false;
    }, [input]);

    const handleAdd = (fileObjects) => {
        const newFiles = [].concat(files, fileObjects);
        setFiles(newFiles);
        input.onChange(newFiles);
    }

    const handleDrag = (index) => {
        if (dragIndex === null) {
            setDragIndex(index);
        }
    }

    const handleDrop = (targetIndex) => {
        if (dragIndex !== targetIndex) {
            const newFiles = [...files];

            newFiles[dragIndex] = files[targetIndex];
            newFiles[targetIndex] = files[dragIndex];

            setFiles(newFiles);
            input.onChange(newFiles);
        }

        setDragIndex(null);
    }

    const handleDelete = (file, index) => {
        const newFiles = files.filter((f, i) => i !== index);
        setFiles(newFiles);
        input.onChange(newFiles);
    }

    const getPreviewIcon = (fileObject, classes) => {
        const { data, file } = fileObject;
        const index = files.findIndex(f => f.file.name === file.name);
        
        return (
            <img
                src={data}
                className={classes.image}
                alt=""
                onDrag={() => handleDrag(index)}
                onDrop={() => handleDrop(index)}
            />
        )
    }

    return (
        <Box width="100%" m={2} display="flex" flexDirection="column">
            <MuiThemeProvider theme={theme}>
                <DropzoneAreaBase
                    fileObjects={files}
                    onAdd={(newFile) => handleAdd(newFile)}
                    onDelete={(file, index) => handleDelete(file, index)}
                    getPreviewIcon={getPreviewIcon}
                    showPreviewsInDropzone={false}
                    acceptedFiles={acceptedFiles}
                    dropzoneText={dropzoneText}
                    showPreviews
                    {...custom}
                />
            </MuiThemeProvider>
        </Box>
    );
}

const Upload = (props) => <Field component={renderDropZone} {...props} />

export default Upload;
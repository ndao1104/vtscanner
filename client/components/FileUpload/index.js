
import { Box, Center, Text, Tag } from '@chakra-ui/react';
import { useState } from 'react';
import Dropzone from 'react-dropzone';

export default function FileUpload() {
    const [referenceNumber, setReferenceNumber] = useState(null);

    function uploadFileHashes(files) {
        let formData = new FormData();

        formData.append('file', files[0]);

        fetch('http://localhost:5000/scan', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(referenceNumber => setReferenceNumber(referenceNumber));
    }

    function ReferenceNumberDialog(referenceNumber) {
        return (
            <>
                <Text
                    mt={16}
                    mb={4}
                    color={'gray.600'}
                    fontSize={'lg'}
                    fontWeight={'semibold'}
                    textAlign={'center'}
                >
                    Please use the reference number below to view your scan report.
                </Text>
                <Center>
                    <Tag
                        size={'lg'}
                        color={'gray.600'}
                        fontWeight={'bold'}
                    >
                        {referenceNumber}
                    </Tag>
                </Center>
            </>
        )
    }

    return (
        <Box>
            <Dropzone
                maxFiles={1}
                accept={{
                    'text/plain': ['.txt']
                }}
                onDrop={uploadFileHashes}
            >
                {({ getRootProps, getInputProps }) => (
                    <Center
                        h={80}
                        borderWidth={4}
                        borderStyle={'dashed'}
                        borderRadius={16}
                        cursor={'pointer'}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Text fontSize={'lg'} color={'gray.400'}>Upload file hashes</Text>
                    </Center>
                )}
            </Dropzone>
            {referenceNumber && ReferenceNumberDialog(referenceNumber)}
        </Box>
    )
}
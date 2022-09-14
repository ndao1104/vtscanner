import { Box, Icon, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import ScanReportTable from './ScanReportTable';

export default function ScanReport() {
    const [referenceNumber, setReferenceNumber] = useState(null);
    const [scanReports, setScanReports] = useState(null);

    function getScanReports() {
        fetch(`http://localhost:5000/reports/${referenceNumber}`)
            .then(res => res.json())
            .then(reports => setScanReports([...reports]));
    }

    return (
        <Box>
            <InputGroup size={'lg'} mb={8}>
                <Input
                    borderWidth={2}
                    type={'text'}
                    placeholder='Enter reference number'
                    value={referenceNumber}
                    onChange={e => setReferenceNumber(e.target.value)}
                />
                <InputRightElement
                    cursor={'pointer'}
                    onClick={getScanReports}
                >
                    <Icon as={FaSearch} color={'gray.400'} />
                </InputRightElement>
            </InputGroup>
            {scanReports && <ScanReportTable scanReports={scanReports} />}
        </Box>
    )
}
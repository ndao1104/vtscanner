import { Table, Thead, Tbody, Tr, Th, TableContainer } from '@chakra-ui/react'
import ScanReportRow from './ScanReportRow';

export default function ScanReportTable({ scanReports }) {
    return (
        <TableContainer>
            <Table variant={'simple'}>
                <Thead>
                    <Tr>
                        <Th fontSize={'sm'} textAlign={'center'}>Hash (MD5)</Th>
                        <Th fontSize={'sm'} textAlign={'center'}>Status</Th>
                        <Th fontSize={'sm'} textAlign={'center'}>Number of Engines Detected</Th>
                        <Th fontSize={'sm'} textAlign={'center'}>Scan Date</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        scanReports.map(scanReport =>
                            <ScanReportRow
                                key={scanReport.hash}
                                hash={scanReport.hash}
                                status_code={scanReport.status_code}
                                positives={scanReport.positives}
                                total={scanReport.total}
                                scan_date={scanReport.scan_date}
                            />
                        )
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
}
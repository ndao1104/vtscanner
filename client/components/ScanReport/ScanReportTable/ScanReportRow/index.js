import { Badge, Td, Tr } from '@chakra-ui/react';

export default function ScanReportRow({ hash, status_code, positives, total, scan_date }) {


    function Status(status_code) {
        switch (status_code) {
            case 1:
                return <Badge colorScheme={'green'}>Completed</Badge>;

            case 2:
                return <Badge>Queued</Badge>;

            case 3:
                return <Badge colorScheme={'red'}>Error</Badge>;

            default:
                break;
        }
    }

    return (
        <Tr>
            <Td fontSize={'sm'}>{hash}</Td>
            <Td fontSize={'sm'} textAlign={'center'}>{Status(status_code)}</Td>
            <Td fontSize={'sm'} textAlign={'center'}>{(positives || total) ? `${positives}/${total}` : 'N/A'}</Td>
            <Td fontSize={'sm'}>{scan_date ? `${scan_date} UTC` : 'N/A'}</Td>
        </Tr>
    )
}
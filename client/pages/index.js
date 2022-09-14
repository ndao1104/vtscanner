import { Container, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FileUpload from '../components/FileUpload';
import ScanReport from '../components/ScanReport';

export default function Home() {
  return (
    <Container maxW={'container.xl'}>
      <Heading my={16} color={'blue.600'} textAlign={'center'}>VT Scanner</Heading>
      <Tabs isFitted variant={'line'}>
        <TabList mb={4}>
          <Tab><Heading as={'h5'} size={'md'}>Upload File Hashes</Heading></Tab>
          <Tab><Heading as={'h5'} size={'md'}>View Scan Report</Heading></Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FileUpload />
          </TabPanel>
          <TabPanel>
            <ScanReport />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  )
}

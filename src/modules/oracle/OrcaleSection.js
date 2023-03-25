const {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel
} = require('@chakra-ui/react');

const OracleSection = ({ sections }) => {
  return (
    <Accordion w={'100%'} allowToggle mt={4}>
      {sections.map((item) => (
        <AccordionItem key={item.title}>
          <h2>
            <AccordionButton>
              <Box as='span' flex='1' textAlign='left'>
                {item.title}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel>{item.content}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default OracleSection;

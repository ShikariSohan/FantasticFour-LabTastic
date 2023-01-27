import { Modal } from "@mantine/core";
import { Title } from "@mantine/core";
import { Text } from "@mantine/core";
import { List, ThemeIcon } from "@mantine/core";
import { IconCircleCheck, IconCircleDashed } from "@tabler/icons";
import { useRouter } from "next/router";

export default function LabSelectModal({ opened, setOpened, subject }) {
  const router = useRouter();
  const labs = {
    chemistry: [{
      url:"/lab/chemistry/molarity",
      name:"Molarity Experiment"
    }],
    physics: [{
      name:"Another Experiment",
      url:"/lab/physics/lens"
    },{
      name:"Lens Experiment",
      url:"/lab/physics/lens"
    }],
    biology: [{
      name:"Plant Cell Examination",
      url:"/lab/biology/cell"
    },
    {
      name:"Another Experiment",
      url:"/lab/biology/cell"
    },
  ],
  };

  return (
    <Modal
      title="Select Lab To Demonstrate :"
      opened={opened}
      onClose={() => setOpened(false)}
      size="lg"
      withPadding
      centered
    >
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <IconCircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {labs[subject] == undefined ? (
          <List.Item>No Labs Available</List.Item>
        ) : (
          labs[subject].map((lab) => {
            return <List.Item
            
            onClick={()=>{
              router.push(lab.url)
            }}
            >{lab.name}</List.Item>;
          })
        )}
      </List>
    </Modal>
  );
}

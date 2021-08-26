const cornerTypes = {
    "right" : {
        "up" : "corner-oiio",
        "down" : "corner-iioo"
    },
    "left" : {
        "up" : "corner-ooii",
        "down" : "corner-iooi"
    },
    "up" : {
        "right" : "corner-iooi",
        "left" : "corner-iioo"
    },
    "down" : {
        "right" : "corner-ooii",
        "left" : "corner-oiio"
    }
};

const whichBodyPart = (head, neck) => {
    neck.direction == head.direction
    ? neck.bodyPart = "body"
    : neck.bodyPart = cornerTypes[neck.direction][head.direction];
};

export default whichBodyPart;
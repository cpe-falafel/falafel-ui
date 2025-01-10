export const DrawboxFilterData = {
    proto: [
        {
            label: "Nom",
            key: "_label",
            type: "string"
        },
        {
            label: "Top",
            key: "top",
            type: "uint"    
        },
        {
            label: "Bottom",
            key: "bottom",
            type: "uint"    
        },
        {
            label: "Left",
            key: "left",
            type: "uint"    
        },
        {
            label: "Right",
            key: "right",
            type: "uint"    
        },
        {
            label: "Thickness",
            key: "thickness",
            type: "uint1"    
        },
        {
            label: "Color",
            key: "color",
            type: "color"    
        },
    ],
    handles:{in:["v1"], out:["v1"]},
}
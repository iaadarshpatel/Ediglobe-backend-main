import React, { useState } from 'react';
import { OrganizationChart } from 'primereact/organizationchart';

export default function TeamStructure() {
    const [data] = useState([
        {
            expanded: true,
            type: 'person',
            className: 'bg-indigo-500 text-white rounded-lg shadow-md',
            data: {
                image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
                name: 'Amy Elsner',
                title: 'CEO'
            },
            children: [
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-purple-500 text-white rounded-lg shadow-md',
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
                        name: 'Anna Fali',
                        title: 'CMO'
                    },
                    children: [
                        {
                            label: 'Sales',
                            className: 'bg-purple-500 text-white rounded-lg shadow-md'
                        },
                        {
                            label: 'Marketing',
                            className: 'bg-purple-500 text-white rounded-lg shadow-md'
                        }
                    ]
                },
                {
                    expanded: true,
                    type: 'person',
                    className: 'bg-teal-500 text-white rounded-lg shadow-md',
                    data: {
                        image: 'https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png',
                        name: 'Stephen Shaw',
                        title: 'CTO'
                    },
                    children: [
                        {
                            label: 'Development',
                            className: 'bg-teal-500 text-white rounded-lg shadow-md'
                        },
                        {
                            label: 'UI/UX Design',
                            className: 'bg-teal-500 text-white rounded-lg shadow-md'
                        }
                    ]
                }
            ]
        }
    ]);

    const nodeTemplate = (node) => {
        if (node.type === 'person') {
            return (
                <div className="flex flex-col items-center p-4">
                    <img alt={node.data.name} src={node.data.image} className="mb-3 w-16 h-16 rounded-full border-2 border-white" />
                    <span className="font-bold mb-2 text-lg">{node.data.name}</span>
                    <span className="text-sm">{node.data.title}</span>
                </div>
            );
        }

        return node.label;
    };

    return (
        <div className="card item-center overflow-x-auto">
            <OrganizationChart value={data} nodeTemplate={nodeTemplate} />
        </div>
    );
}

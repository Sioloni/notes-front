import React, {useState, useRef} from 'react';
import Tree from 'react-d3-tree';
import PropTypes from "prop-types";
import ContentList from "./ContentList.jsx";
export default function ContentTree({ data }) {

// Преобразование ответа API в формат данных для orgChart
    const transformedData = {
        name: 'Заметки',
        children: data.map(item => ({
            name: item.title,
            attributes: {
                id: item.id,
                Тэги: item.tags.join(', '),
                ДатаВремя: new Date(item.date).toLocaleString("ru-RU"),
                Коллекция: item.text
            },
            children: item.recordIds.map(recordId => ({
                name: `Record ${recordId}`
            }))
        }))
    };

// Использование преобразованных данных для orgChart
    const orgChart = transformedData;


    const [selectedNode, setSelectedNode] = useState(null);
    const treeRef = useRef(null);

    const handleNodeClick = (nodeData) => {
        setSelectedNode(nodeData);
        centerNode(nodeData);
    };

    const centerNode = (nodeData) => {
        if (treeRef.current) {
            treeRef.current.centerNode(nodeData);
        }
    };


    let StartTranslate ={x: 300, y: 300};
    return (
        <div style={{height: '70vh', background: '#333'}}>
            <Tree
                ref={treeRef}
                data={orgChart}
                initialDepth={1}
                depthFactor={300}
                pathFunc='step'
                transitionDuration={300}
                translate={StartTranslate}
                nodeSvgShape={{
                    shape: 'circle',
                    shapeProps: {
                        r: 10,
                        onClick: handleNodeClick,
                        className: (nodeData) =>
                            selectedNode === nodeData ? 'node-selected' : '',
                    },
                }}
            />
        </div>
    )
}
ContentTree.propTypes = {
    data: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.array,
        PropTypes.number
    ])
}
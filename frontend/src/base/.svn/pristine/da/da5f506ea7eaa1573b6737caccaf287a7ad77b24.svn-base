import './quadro.css';
import { CSSProperties, Fragment, useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult, DragStart, OnDragUpdateResponder, DragUpdate, ResponderProvided, BeforeCapture, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { utilities } from '../../utils/utilities';
import Card, { CardBody, CardFooter } from '../card/card';
import Spinner from 'react-bootstrap/esm/Spinner';
import { VariableSizeList as List, ListChildComponentProps } from 'react-window';
import AutoSizer, { VerticalSize } from 'react-virtualized-auto-sizer'

export interface QuadroCard {
   id: string,
   price?: number,
   style?: CSSProperties,
   draggable?: boolean,
   resource?: any
}

export interface QuadroLane {
   id: string,
   statusId: number,
   resource?: any,
   order?: number,
   permissions?: Array<number>,
   title?: string,
   style?: CSSProperties,
   titleStyle?: CSSProperties,
   color?: string,
   hideCounter?: boolean,
   hidePrice?: boolean,
   cards?: Array<QuadroCard>,
   droppable?: boolean,
   hideHeader?: boolean,
   hideFooter?: boolean,
   quantidade?: number,
   valor?: number,
   // disallowAddingCard?:a boolean
}

export interface QuadroComponents {
   Card?: (card: QuadroCard, provided: DraggableProvided, snapshot: DraggableStateSnapshot, color?: string) => JSX.Element,
   LaneHeader?: (lane: QuadroLane, provided: DraggableProvided) => JSX.Element,
   LaneTitle?: (lane: QuadroLane) => JSX.Element,
}

export interface QuadroProps {
   data: Array<QuadroLane>,
   className?: string,
   loading?: boolean,

   disableDragLane?: boolean,
   disableDragCard?: boolean,

   handleLaneBeforeDragStart?: (lane: QuadroLane) => void,
   handleLaneDragStart?: (lane: QuadroLane) => void,
   handleLaneDragEnd?: (data: Array<QuadroLane>, source: QuadroLane, sourceIndex: number, targetIndex: number) => void,
   handleLaneDragUpdate?: (update: DragUpdate, provided: ResponderProvided) => void,

   handleBeforeDragStart?: (card: QuadroCard, lane: QuadroLane) => void,
   handleDragStart?: (card: QuadroCard, lane: QuadroLane) => void,
   handleDragEnd?: (data: Array<QuadroLane>, card: QuadroCard, sourceLane: QuadroLane, targetLane: QuadroLane, permission: boolean) => void,
   handleDragUpdate?: (update: DragUpdate, provided: ResponderProvided) => void,

   onLaneScrollEnd?: (laneId: string) => void;

   components?: QuadroComponents
}

const Quadro: React.FC<QuadroProps> = (props) => {
   const { data, className, loading,
      disableDragLane, disableDragCard,
      handleLaneBeforeDragStart, handleLaneDragStart, handleLaneDragEnd, handleLaneDragUpdate,
      handleBeforeDragStart, handleDragStart, handleDragEnd, handleDragUpdate,
      components } = props;

   const listRef = useRef<Record<string, any>>({});
   const [lanePermissions, setLanePermissions] = useState<Array<number>>()
   const [isDraggingCard, setIsDraggingCard] = useState<boolean>(false)

   useEffect(() => {
      Object.values(listRef.current).forEach(list => {
         list?.resetAfterIndex(0, true);
      });
   }, [data]);
   
   const onBeforeDragStart = (start: DragStart) => {
      const { source, type } = start;

      if (type === 'LANE') {
         const sourceLane = data[source.index];

         if (handleLaneBeforeDragStart)
            handleLaneBeforeDragStart(sourceLane);
      } else if (type === 'CARD') {
         const sourceLane = data.find(x => x.id === source.droppableId)!;

         if (sourceLane.cards) {
            const draggedCard = sourceLane.cards[source.index];

            if (handleBeforeDragStart)
               handleBeforeDragStart(draggedCard, sourceLane);
         }
      }
   }

   const onDragStart = (start: DragStart) => {
      const { source, type } = start;

      if (type === 'LANE') {
         const sourceLane = data[source.index];

         if (handleLaneDragStart)
            handleLaneDragStart(sourceLane);
      } else if (type === 'CARD') {
         setIsDraggingCard(true);
         const sourceLane = data.find(x => x.id === source.droppableId)!;

         setLanePermissions(sourceLane.permissions);

         if (sourceLane.cards) {
            const draggedCard = sourceLane.cards[source.index];

            if (handleDragStart)
               handleDragStart(draggedCard, sourceLane);
         }
      }
   }

   const onDragEnd = (result: DropResult) => {
      setIsDraggingCard(false);
      if (!result.destination) return;
      const { source, destination, type } = result;

      const lanesUpdated = data;

      if (type === 'LANE') {
         const sourceLane = lanesUpdated[source.index];

         // lanesUpdated.splice(result.source.index, 1);

         const [removed] = lanesUpdated.splice(source.index, 1);
         lanesUpdated.splice(destination.index, 0, removed);

         lanesUpdated.map((_lane, index) => {
            lanesUpdated[index].order = index;
         })

         if (handleLaneDragEnd)
            handleLaneDragEnd(lanesUpdated, sourceLane, source.index, destination.index);
      } else if (type === 'CARD') {
         const sourceLane = lanesUpdated.find(x => x.id === source.droppableId)!;

         setLanePermissions(undefined);

         const destLane = lanesUpdated.find(x => x.id === destination.droppableId)!;

         const draggedCard = sourceLane.cards![source.index];

         const commonDE = () => {
            if (sourceLane.cards && destLane.cards) {
               sourceLane.cards.splice(source.index, 1);
               destLane.cards.splice(destination.index, 0, draggedCard);

               sourceLane.quantidade = (sourceLane.quantidade ?? 0) - 1;
               destLane.quantidade = (destLane.quantidade ?? 0) + 1;

               sourceLane.valor = (sourceLane.valor ?? 0) - (draggedCard.resource.VALOR ?? 0);
               destLane.valor = (destLane.valor ?? 0) + (draggedCard.resource.VALOR ?? 0);

               if (handleDragEnd)
                  handleDragEnd(lanesUpdated, draggedCard, sourceLane, destLane, true);

               if (listRef.current[sourceLane.id]) {
                  listRef.current[sourceLane.id].resetAfterIndex(0, true);
               }
               if (sourceLane.id !== destLane.id && listRef.current[destLane.id]) {
                  listRef.current[destLane.id].resetAfterIndex(0, true);
               }

            }
         }

         if (sourceLane.permissions) {
            if (sourceLane.permissions.find(x => (x === destLane.statusId))) {
               commonDE();
            } else {
               if (handleDragEnd)
                  handleDragEnd(lanesUpdated, draggedCard, sourceLane, destLane, false);
            }
         } else {
            commonDE();
         }
      }
   }

   const onDragUpdate = (update: DragUpdate, provided: ResponderProvided) => {
      const { type } = update;

      // if (update.destination) {
      //    if (!isDragging)
      //       setIsDragging(true);
      // } else {
      //    if (isDragging)
      //       setIsDragging(false);
      // }

      if (type === 'LANE') {
         if (handleLaneDragUpdate)
            handleLaneDragUpdate(update, provided);
      } else if (type === 'CARD') {
         if (handleDragUpdate)
            handleDragUpdate(update, provided);
      }
   }

   const virtualCards: React.FC<ListChildComponentProps> = ({ index, style, data }) => {
      const { cards, lane, disableDragCard, components } = data;
      const card = cards[index];
      return (
         <Draggable
            key={card.id}
            draggableId={card.id}
            index={index}
            isDragDisabled={disableDragCard}
         >
            {(provided, snapshot) => (
               <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={{
                     ...provided.draggableProps.style,
                     ...style,
                     paddingBottom: 10,
                  }}
               >
                  <div
                     className={`quadro-card${snapshot.isDragging ? ' isDragging' : ''}`}
                     style={{
                        borderColor: lane.color || '',
                     }}
                  >
                     {components?.Card ? components.Card(card, provided, snapshot, lane.color) : null}
                  </div>
               </div>
            )}
         </Draggable>
      );
   };

   const getItemSize = (index: number, cards: QuadroCard[] = []): number => {
      const card = cards[index];
      if (!card?.resource) return 0;

      let size = 170;

      if (card.resource.CONTATO_NOME) size += 25;
      if (card.resource.NR_FONE) size += 25;
      if (card.resource.EMAIL) size += 25;

      return size;
   };

   return (
      < div className={"quadro-container" + (className ? (" " + className) : "") + (isDraggingCard ? " dragging" : "")} >
         <DragDropContext
            onBeforeDragStart={onBeforeDragStart}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragUpdate={onDragUpdate}
         >
            <Droppable
               droppableId='quadro-kanban'
               type='LANE'
               direction='horizontal'
               isDropDisabled={disableDragLane}
            // ignoreContainerClipping={Boolean(containerHeight)}
            // isCombineEnabled={isCombineEnabled}
            >
               {(provided) => {
                  return (
                     <div
                        style={{ display: 'inline-flex' }}
                        ref={provided.innerRef} {...provided.droppableProps}
                     >
                        {data.sort((a, b) => (a.order && b.order) ? (a.order - b.order) : 0).map((lane, index) => {
                           return (
                              <Draggable
                                 key={'lane-' + lane.id}
                                 draggableId={'lane-' + lane.id}
                                 index={index}
                                 isDragDisabled={disableDragLane}
                              >
                                 {(provided1) => {
                                    const { style, ...draggableProps } = provided1.draggableProps;

                                    const styleHorizontal: CSSProperties = {
                                       ...style,
                                       transform: (style?.transform ? (style?.transform.split(',')[0] + ', 0px)') : style?.transform)
                                    }

                                    return (
                                       <div
                                          style={{
                                             display: "flex",
                                             flexDirection: "column",
                                             alignItems: "center",
                                             ...styleHorizontal
                                          }}
                                          key={lane.id}
                                          ref={provided1.innerRef}
                                          {...draggableProps}
                                       >
                                          <div className={'quadro-lane' + ((lanePermissions) ? (((lanePermissions.length > 0) && lanePermissions.includes(lane.statusId)) ? ' isPermissible' : ' notPermissible') : ' notPermissions')}>
                                             <Droppable
                                                droppableId={lane.id}
                                                type='CARD'
                                                key={lane.id}
                                                isDropDisabled={((lanePermissions) ? (((lanePermissions.length > 0) && lanePermissions.includes(lane.statusId)) ? false : true) : true)}
                                                mode="virtual"
                                                renderClone={(provided, snapshot, rubric) => {
                                                   const card = lane.cards?.[rubric.source.index];
                                                   if (!card) return <></>;

                                                   return (
                                                      <div
                                                         ref={provided.innerRef}
                                                         {...provided.draggableProps}
                                                         {...provided.dragHandleProps}
                                                         className={`quadro-card isDragging`}
                                                         style={{
                                                            ...provided.draggableProps.style,
                                                            zIndex: 1000,
                                                            position: 'fixed',
                                                            pointerEvents: 'none',
                                                            width: '260px',
                                                            borderColor: lane.color || ''
                                                         }}
                                                      >
                                                         {components?.Card ? components.Card(card, provided, snapshot, lane.color) : null}
                                                      </div>
                                                   )
                                                }}
                                             >
                                                {(provided, snapshot) => {
                                                   return (
                                                      <Fragment>
                                                         {(components && components.LaneHeader) ? components.LaneHeader(lane, provided1) :
                                                            <div className='quadro-laneHeader'>
                                                               <div className='quadro-laneHeaderTop' style={{ backgroundColor: (lane.color ? lane.color : ''), color: (lane.color ? (utilities.isDarkColor(lane.color) ? 'white' : 'black') : '') }}

                                                                  {...provided1.dragHandleProps}
                                                               >
                                                                  {(components && components.LaneTitle) ? components.LaneTitle(lane) :
                                                                     <div className='quadro-laneHeaderTitle' title={lane.title ? lane.title : lane.id}>
                                                                        <span>{lane.title ? lane.title : lane.id}</span>
                                                                     </div>
                                                                  }
                                                                  {(!lane.hideCounter) &&
                                                                     <div className='quadro-laneHeaderCount'>
                                                                        <span>{lane.quantidade || 0}</span>
                                                                     </div>
                                                                  }
                                                               </div>
                                                               {(!lane.hidePrice) &&
                                                                  <div className='quadro-laneHeaderBottom'>
                                                                     <span style={{ fontWeight: 600 }}>Total:</span>{' ' + utilities.formatValue(lane.valor ?? 0, 2)}
                                                                  </div>
                                                               }
                                                            </div>
                                                         }
                                                         <div
                                                            {...provided.droppableProps}
                                                            ref={provided.innerRef}
                                                            {...{
                                                               className: `quadro-laneDrag${(lane.hidePrice ? ' hidePrice' : '')}${snapshot.isDraggingOver ? ' isDraggingOver' : ''}`
                                                            }}
                                                         >
                                                            {/* <div className='quadro-laneScrollable'> */}
                                                            {loading ? (
                                                               <div className='d-flex align-items-center justify-content-center pt-5'>
                                                                  <Spinner className='text-primary' style={{ width: 40, height: 40, fontSize: 16 }} />
                                                               </div>
                                                            ) : lane.cards && (
                                                               <AutoSizer disableWidth>
                                                                  {(size: VerticalSize) => (
                                                                     <List
                                                                        ref={(el) => { if (el) listRef.current[lane.id] = el }}
                                                                        itemKey={(index, data) => data.cards[index]?.id}
                                                                        key={lane.id}
                                                                        height={size.height}
                                                                        itemCount={lane.cards?.length ?? 0}
                                                                        itemSize={(index) => getItemSize(index, lane.cards)}
                                                                        width={265}
                                                                        itemData={{ cards: lane.cards, lane, disableDragCard, components }}
                                                                        onScroll={({ scrollOffset, scrollUpdateWasRequested }) => {
                                                                           if (scrollUpdateWasRequested) return;

                                                                           const totalHeight = lane.cards?.reduce((soma, _, index) => soma + getItemSize(index, lane.cards), 0) || 0;

                                                                           if (scrollOffset + size.height >= totalHeight - 1000) {
                                                                              props.onLaneScrollEnd?.(lane.id);
                                                                           }
                                                                        }}
                                                                     >
                                                                        {virtualCards}
                                                                     </List>
                                                                  )}
                                                               </AutoSizer>
                                                            )}
                                                            {provided.placeholder}
                                                            {/* </div> */}
                                                         </div>
                                                      </Fragment>
                                                   )
                                                }}
                                             </Droppable>
                                          </div>
                                       </div>
                                    )
                                 }}
                              </Draggable>
                           )
                        })}
                        {provided.placeholder}
                     </div>
                  )
               }}
            </Droppable>
         </DragDropContext>
      </div >
   )
}

export default Quadro;



// import './quadro.css';
// import Board from 'react-trello-ts';
// import { BoardContainerProps } from 'react-trello-ts/dist/controllers/BoardContainer';

// interface QuadroProps extends BoardContainerProps { }

// const Quadro: React.FC<QuadroProps> = (props) => {
//    return (
//       <Board {...props} />
//    )
// }

// export default Quadro;
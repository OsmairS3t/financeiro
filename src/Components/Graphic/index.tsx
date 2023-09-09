import { useState, useEffect } from 'react';
import { VictoryPie, VictoryTooltip } from 'victory-native'

import { Container, MessageView, MessageEmpty } from './styles';
import { IResumeCategory } from '@utils/interfaces';

interface Props {
    resumesCategory: IResumeCategory[];
}

export function Graphic({ resumesCategory }: Props) {
    let isEmpty = true;

    function viewEmpty(resumesCategory: IResumeCategory[]) {
        resumesCategory.map(rc => {
            if (rc.balancecategory === 0) {
                isEmpty = true
            } else {
                isEmpty = false
            }
        })
        return isEmpty;
    }

    return (
        <Container>
            {!viewEmpty(resumesCategory) ?
                <VictoryPie
                    data={resumesCategory}
                    width={200}
                    innerRadius={90}
                    x='namecategory'
                    y='balancecategory'
                    colorScale={resumesCategory.map(res => res.colorcategory)}
                    animate={{
                        duration: 2000,
                        easing: "bounce"
                    }}
                    style={{
                        labels: {
                            fill: '#fff'
                        },
                        data: {
                            fillOpacity: 0.8,
                            stroke: ({ datum }) => datum.color,
                            strokeWidth: 1
                        }
                    }}
                    labelComponent={
                        <VictoryTooltip
                            renderInPortal={false}
                            flyoutStyle={{
                                fill: ({ datum }) => datum.color
                            }}
                        />
                    }
                />
                :
                <MessageView>
                    <MessageEmpty>
                        Não houve lançamentos na data informada.
                    </MessageEmpty>
                </MessageView>
            }
        </Container>
    )
}
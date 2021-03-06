import React from 'react';
// import { Card, Col, Row, Tooltip } from 'antd';
// import { InfoCircleFilled, CaretUpFilled } from '@ant-design/icons';
// import { ChartCard, MiniBar, MiniProgress, ProductBarChart, ProductPieChart } from '@Element/Charts';
// import MiniArea from '@Element/Charts/MiniArea';
// import { movementSummary, visitSummary } from '@Src/Data/Dashboard';

export default function Dashboard() {
    // const topColResponsiveProps = {
    //     xs: 24,
    //     sm: 12,
    //     md: 12,
    //     lg: 12,
    //     xl: 6,
    //     style: { marginBottom: 24 },
    // };

    return (
        <>
            {/*<Row gutter={24}>*/}
            {/*    <Col {...topColResponsiveProps}>*/}
            {/*        <ChartCard*/}
            {/*            bordered={false}*/}
            {/*            title="Total Items"*/}
            {/*            action={*/}
            {/*                <Tooltip title="Total number of items">*/}
            {/*                    <InfoCircleFilled />*/}
            {/*                </Tooltip>*/}
            {/*            }*/}
            {/*            loading={false}*/}
            {/*            total={12}*/}
            {/*            footer={*/}
            {/*                <>*/}
            {/*                    <span className="boldText">{13}</span> Items added in the last{' '}*/}
            {/*                    <span className="boldText">7</span> days*/}
            {/*                </>*/}
            {/*            }*/}
            {/*            contentHeight={46}*/}
            {/*        >*/}
            {/*            <div style={{ position: 'absolute', bottom: 0, left: 0 }}>*/}
            {/*                Weekly Changes*/}
            {/*                <span className="trendText">{14}%</span>*/}
            {/*                <CaretUpFilled style={{ color: '#52c41a' }} />*/}
            {/*            </div>*/}
            {/*        </ChartCard>*/}
            {/*    </Col>*/}
            {/*    <Col {...topColResponsiveProps}>*/}
            {/*        <ChartCard*/}
            {/*            bordered={false}*/}
            {/*            title="Portal Visits"*/}
            {/*            action={*/}
            {/*                <Tooltip title="Total number of active users in the last month.">*/}
            {/*                    <InfoCircleFilled />*/}
            {/*                </Tooltip>*/}
            {/*            }*/}
            {/*            loading={false}*/}
            {/*            total={10}*/}
            {/*            footer={*/}
            {/*                <>*/}
            {/*                    <span className="boldText">{12}</span> Average daily visits per day*/}
            {/*                </>*/}
            {/*            }*/}
            {/*            contentHeight={46}*/}
            {/*        >*/}
            {/*            <MiniArea color="#975FE4" data={visitSummary} />*/}
            {/*        </ChartCard>*/}
            {/*    </Col>*/}
            {/*    <Col {...topColResponsiveProps}>*/}
            {/*        <ChartCard*/}
            {/*            bordered={false}*/}
            {/*            title="Items Moved"*/}
            {/*            action={*/}
            {/*                <Tooltip title="Item movement in the last year.">*/}
            {/*                    <InfoCircleFilled />*/}
            {/*                </Tooltip>*/}
            {/*            }*/}
            {/*            loading={false}*/}
            {/*            total={124}*/}
            {/*            footer={*/}
            {/*                <>*/}
            {/*                    <span className="boldText">{123}</span> Items moved in the last month*/}
            {/*                </>*/}
            {/*            }*/}
            {/*            contentHeight={46}*/}
            {/*        >*/}
            {/*            <MiniBar data={movementSummary} />*/}
            {/*        </ChartCard>*/}
            {/*    </Col>*/}
            {/*    <Col {...topColResponsiveProps}>*/}
            {/*        <ChartCard*/}
            {/*            bordered={false}*/}
            {/*            title="Item Returns"*/}
            {/*            action={*/}
            {/*                <Tooltip title="Percentage of returned items.">*/}
            {/*                    <InfoCircleFilled />*/}
            {/*                </Tooltip>*/}
            {/*            }*/}
            {/*            loading={false}*/}
            {/*            total={10 + ' %'}*/}
            {/*            footer={*/}
            {/*                <>*/}
            {/*                    <span className="boldText">{12}</span> Items in the last year*/}
            {/*                </>*/}
            {/*            }*/}
            {/*            contentHeight={46}*/}
            {/*        >*/}
            {/*            <MiniProgress percent={10} strokeWidth={16} color="#13C2C2" target={100} />*/}
            {/*        </ChartCard>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
            {/*<Row gutter={24}>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Weekly Sale Report">*/}
            {/*            <ProductBarChart />*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*    <Col span={12}>*/}
            {/*        <Card title="Sale Summary">*/}
            {/*            <ProductPieChart />*/}
            {/*        </Card>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </>
    );
}

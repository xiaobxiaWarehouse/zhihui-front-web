import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Button, Modal, Form, Spin, Row, Checkbox, Col } from 'antd';
import { Layout } from 'components';

const CSS = Layout.styles;
const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const AllocateModal = (props) => {
  const {
    role, onOk, dispatch, ...modalProps
  } = props;

  const { loading, rolePriv } = role;

  const onCheckAllChange = (value, item) => {
    let checke = value.target.checked;
    let newData;
    newData = rolePriv.map((k) => {
      if (k.id === item.id) {
        k.childrenValue = checke
          ? item.children.map((j) => {
            return j.value;
          })
          : [];
        k.checked = checke;
      }
      return k;
    });
    dispatch({
      type: 'role/updateRolepriv',
      payload: newData,
    });
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  };

  const handleGroupChange = (value, item) => {
    let newData = rolePriv.map((k) => {
      if (k.id === item.id) {
        k.childrenValue = value;
        k.checked = value.length === item.children.length;
      }
      return k;
    });
    dispatch({
      type: 'role/updateRolepriv',
      payload: newData,
    });
    dispatch({
      type: 'app/updataFormChange',
      payload: true,
    });
  };
  const onSubmit = () => {
    onOk(rolePriv);
  };

  const text = () => {
    return (
      <div>
        <Row>
          <Col span={24}>
            <FormItem>
              {rolePriv.map((item, index) => {
                let dataIndex = index;
                return (
                  <Row style={{ fontSize: 15, margin: 10 }} key={dataIndex}>
                    <Checkbox
                      checked={item.checked}
                      onChange={(value) => {
                        onCheckAllChange(value, item);
                      }}
                    >
                      {item.label}
                    </Checkbox>
                    {item.children.length > 0 && (
                      <Row>
                        <CheckboxGroup
                          style={{ paddingLeft: 20 }}
                          options={item.children}
                          value={item.childrenValue}
                          onChange={(value) => {
                            handleGroupChange(value, item);
                          }}
                        />
                      </Row>
                    )}
                  </Row>
                );
              })}
            </FormItem>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <Modal
      className={CSS.addModal}
      {...modalProps}
      footer={[
        <Button
          className={CSS.searchBtn}
          onClick={() => {
            onSubmit();
          }}
          type="primary"
          key="submit"
        >
          确认
        </Button>,
      ]}
    >
      <Spin spinning={loading}>{text()}</Spin>
    </Modal>
  );
};

AllocateModal.propTypes = {
  item: PropTypes.object,
  onFilterChange: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    role: state.role,
  };
}

export default injectIntl(connect(mapStateToProps)(Form.create()(AllocateModal)));

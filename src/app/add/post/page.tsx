'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Col, Empty, Form, GetProp, message, Row, SelectProps, Spin, Tag, Upload, UploadFile, UploadProps } from 'antd';
import { ProCard, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import { listTagVoByPageUsingPost } from '@/api/categoryController';
import { listTagVoByPageUsingPost1 } from '@/api/tagController';
import { addPostUsingPost } from '@/api/postController';
import { debounce } from '@/utils/tool';
import MdEditor from '@/components/MdEditor';
import './index.css';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 10,
        },
        md: {
            span: 2,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
        md: {
            span: 24,
        },
    },
};


const DEFAULT_PAGE_PARAMS = {
    current: 1,
    pageSize: 10,
};

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type TagRender = SelectProps['tagRender'];

const tagRender: TagRender = (props) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color="blue"
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{ marginInlineEnd: 4 }}
        >
            {label}
        </Tag>
    );
};

/**
 * 添加帖子
 */
const AddPostPage = () => {

    const router = useRouter();
    const [form] = Form.useForm();

    const initialValues = {};

    // 分类列表
    const [categoryList, setCategoryList] = useState<API.CategoryVO[]>([]);
    // 标签列表加载状态
    const [tagListLoading, setTagListLoading] = useState(false);
    // 标签列表
    const [tagList, setTagList] = useState([]);
    // 选中的标签
    const [selectedTags, setSelectedTags] = useState<string>('');
    const [fileList, setFileList] = useState<UploadFile[]>([
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
    ]);

    /**
     * 分类选择事件
     * @param categoryId 
     * @param checked 
     */
    const handleCategoryChange = (categoryId: string, checked: boolean) => {
        const nextSelectedTags = categoryId;
        console.log('You are interested in: ', nextSelectedTags);
        setSelectedTags(nextSelectedTags);
        form.setFieldsValue({
            categoryId: nextSelectedTags  // 更新表单字段值
        });
    };

    /**
     * 加载类型数据
     * @returns 
     */
    const loadDataCategoryList = async () => {
        try {
            const query = {
                ...DEFAULT_PAGE_PARAMS
            }
            const res = await listTagVoByPageUsingPost(query);
            const dataList = res.data?.records || [];
            setCategoryList(dataList);
        } catch (error: any) {
            message.error('加载分类列表失败' + error.message);
        }
    }

    /**
     * 加载标签数据
     * @returns 
     */
    const loadDataTagList = async (title?: string) => {
        setTagListLoading(true);
        try {
            const query = {
                ...DEFAULT_PAGE_PARAMS,
                title
            }
            const res = await listTagVoByPageUsingPost1(query);
            const dataList = res.data?.records || [];
            setTagList(dataList);
        } catch (error: any) {
            message.error('加载标签列表失败' + error.message);
        }
        setTagListLoading(false);
    }

    /**
     * 搜索标签
     */
    const handleTagSearch = debounce((title: string) => {
        loadDataTagList(title)
    }, 500)

    useEffect(() => {
        loadDataCategoryList();
        loadDataTagList();
    }, []);

    useEffect(() => {
        console.log('useEffect tagListLoading', tagListLoading);
    }, [tagListLoading])

    const onSubmit = async (values: any) => {
        try {
            const params = {
                ...values,
            };
            const res = await addPostUsingPost(params);
            // TODO 跳转published页面
            router.push("/add/post/published?title=" + values.title);
            return true;
        } catch (error: any) {
            message.error('帖子发布失败 ' + error.message);
            return false;
        }
    };

    const onFinish = async (values: any) => {
        const success = await onSubmit(values);
        if (!success) {
            return false;
        }
        return true;
    };


    const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const onPreview = async (file: UploadFile) => {
        let src = file.url as string;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj as FileType);
                reader.onload = () => resolve(reader.result as string);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined className="ant-upload-icon" />
            <p className="ant-upload-text-title">上传封面</p>
        </button>
        //  <PlusOutlined className="ant-upload-icon" />
        //  <p className="ant-upload-text-title">上传封面</p>
    );

    return (
        <div className='add-post-page'>
            <ProCard title="发布帖子" headerBordered>
                <ProForm
                    form={form}
                    {...formItemLayout}
                    layout="horizontal"
                    onFinish={onFinish}
                    initialValues={initialValues}
                    submitter={{
                        searchConfig: {
                            submitText: '确定并发布',
                        },
                        resetButtonProps: false,
                        render: (_, defaultDoms) => {
                            return (
                                <Row>
                                    <Col span={12} offset={2}>
                                        {defaultDoms}
                                    </Col>
                                </Row>
                            )
                        },
                    }}
                >
                    <ProFormText
                        name="title"
                        label="标题"
                        placeholder="请输入标题"
                        rules={[{ required: true, message: '请填写标题' }]}
                        fieldProps={{
                            showCount: true,
                            maxLength: 20,
                        }}
                    />
                    <ProForm.Item
                        name="categoryId"
                        label="分类"
                        rules={[{ required: true, message: '请选择分类' }]}
                    >
                        {categoryList.map((categoryItem) => {
                            return (
                                <Tag.CheckableTag
                                    key={categoryItem.id}
                                    checked={selectedTags.includes(categoryItem.id)}
                                    onChange={(checked) => handleCategoryChange(categoryItem.id, checked)}
                                    className='category-checkable-tag'
                                >
                                    {categoryItem.title}
                                </Tag.CheckableTag>
                            )
                        })}
                    </ProForm.Item>
                    <ProFormSelect
                        name="tagIdList"
                        label="标签"
                        placeholder="请搜索添加标签"
                        rules={[{ required: true, message: '请选择标签' }]}
                        showSearch
                        mode="multiple"
                        options={tagList.map((tagItem) => {
                            return {
                                value: tagItem.id,
                                label: tagItem.title,
                            }
                        })}
                        fieldProps={{
                            // showArrow: true,
                            filterOption: false,
                            tagRender: tagRender,
                            // searchValue: inputValue,
                            // onChange: (event) => handleTagChange(),
                            onSearch: (value) => handleTagSearch(value),
                            // onBlur: tagCancel,
                            loading: tagListLoading,
                            notFoundContent: tagListLoading ? <Spin size="small" /> : <Empty />,
                        }}
                    />
                    {/* <ProFormUploadDragger
                        name="dragger"
                        label="帖子封面"
                        action="upload.do"
                        style={{ width: '200px' }}
                    /> */}

                    <ProForm.Item
                        name="picture"
                        label="封面"
                    >
                        {/* <ImgCrop rotationSlider> */}
                        <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            rootClassName='custom-ant-upload'
                            // className
                            fileList={fileList}
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                        {/* <Upload
                            name="files"
                            maxCount={1}
                            // fileList={fileList}
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            className='custom-ant-upload'
                            rootClassName='custom-ant-upload'
                            listType="picture-card"
                            onChange={onChange}
                            onPreview={onPreview}
                        >
                            {fileList.length < 5 &&
                                <>
                                    <PlusOutlined className="ant-upload-icon" />
                                    <p className="ant-upload-text-title">上传封面</p>
                                </>
                            }
                        </Upload> */}
                        {/* </ImgCrop> */}
                        <div className="upload-addvice">建议尺寸：192*128px (封面仅展示在首页信息流中)</div>
                    </ProForm.Item>
                    <ProForm.Item
                        name="content"
                        label="内容"
                    >
                        <MdEditor />
                    </ProForm.Item>
                </ProForm>
            </ProCard>
        </div>
    )
}

export default AddPostPage;
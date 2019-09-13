import React from 'react';
import { Form, Button, Dialog, Input, Select, Notification } from 'element-react';

import { API, graphqlOperation } from 'aws-amplify';

import { createMarket } from '../graphql/mutations';

import * as ApiTypes from '../API';

import { AuthContext } from '../context/auth/auth.context';

const convertTagsToOptions = (tags: string[]) => {
  return tags.map((tag) => {
    return { label: tag, value: tag };
  });
};

interface Props {
  isSearching: boolean;
  searchTerm: string;
  handleSearchChange: (searchTerm: string) => void;
  clearSearch: () => void;
  handleSearch: (e: any) => void;
}

const NewMarket: React.FC<Props> = ({
  isSearching,
  searchTerm,
  handleSearchChange,
  handleSearch,
  clearSearch,
}) => {
  const { auth } = React.useContext(AuthContext);
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [marketName, setMarketName] = React.useState('');
  const [tags, setTags] = React.useState([
    'Arts',
    'Web Dev',
    'Technology',
    'Crafts',
    'Entertainment',
  ]);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const [options, setOptions] = React.useState(convertTagsToOptions(tags));

  const handleAddMarket = () => {
    console.log('marketName: ', marketName);

    const input: ApiTypes.CreateMarketInput = {
      name: marketName,
      owner: auth.username,
      tags: selectedTags,
    };

    API.graphql(graphqlOperation(createMarket, { input }))
      .then(({ data }: { data: ApiTypes.CreateMarketMutation }) => {
        if (data.createMarket) {
          console.log('data.createMarket: ', data.createMarket);
          setMarketName('');
          setIsDialogVisible(false);
          setSelectedTags([]);
          Notification.success({
            title: 'Success',
            message: `Successfully create market: ${data.createMarket.name}`,
            duration: 2000,
          });
        }
      })
      .catch((err: any) => {
        Notification.error({
          title: 'Error',
          message: `${err.message} || "Error adding market`,
        });
        setMarketName('');
        setIsDialogVisible(false);
        setSelectedTags([]);
      });
  };

  // const onSearch = (query: any) => {
  //   const fullOptions = convertTagsToOptions(tags);
  //   const filteredOptions = fullOptions.filter(({ label }) => {
  //     return label.toLowerCase().includes(query.toLowerCase());
  //   });

  //   setOptions(filteredOptions);
  // };

  return (
    <>
      <div className="market-header">
        <h1 className="market-title">
          Create Your MarketPlace
          <Button
            type="text"
            icon="edit"
            className="market-title-button"
            onClick={() => {
              setIsDialogVisible(true);
            }}
          />
        </h1>

        <Form inline={true}>
          <Form.Item>
            <Input
              value={searchTerm}
              placeholder="Search Markets..."
              icon="circle-cross"
              onChange={handleSearchChange}
              onIconClick={clearSearch}
            />
          </Form.Item>
          <Form.Item>
            <Button type="info" icon="search" onClick={handleSearch} loading={isSearching}>
              Search
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Dialog
        title="Create New Market"
        visible={isDialogVisible}
        onCancel={() => setIsDialogVisible(false)}
        customClass="dialog"
      >
        <Dialog.Body>
          <Form labelPosition="top">
            <Form.Item label="Add Market Name">
              <Input
                autoFocus={true}
                value={marketName}
                placeholder="Market Name"
                onChange={(marketName) => {
                  setMarketName(marketName as any);
                }}
              />
            </Form.Item>
            <Form.Item label="Add Market Name">
              <Select
                value={selectedTags}
                multiple
                filterable
                placeholder="Market Tags"
                onChange={(selectedTags) => {
                  setSelectedTags(selectedTags);
                }}
                // remoteMethod={onSearch}
                // remote={true}
              >
                {options.map((option) => {
                  return (
                    <Select.Option key={option.value} label={option.value} value={option.value} />
                  );
                })}
              </Select>
            </Form.Item>
          </Form>
        </Dialog.Body>
        <Dialog.Footer>
          <Button onClick={() => setIsDialogVisible(false)}>Cancel</Button>
          <Button
            type="primary"
            disabled={!marketName}
            onClick={(e) => {
              e.preventDefault();
              handleAddMarket();
            }}
          >
            Add
          </Button>
        </Dialog.Footer>
      </Dialog>
      <div>New Market</div>
    </>
  );
};

export default NewMarket;
